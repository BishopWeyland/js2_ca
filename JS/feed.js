const API_BASE_URL = "https://api.noroff.dev";
const feed = document.querySelector(".feed-container");

async function getWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
    feed.innerHTML = "";

    function search(json) {
      const searchForm = document.querySelector("form#search-form");

      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const searchTerm = form.term.value;
        const term = searchTerm.toLowerCase();
        const filteredPosts = json.filter((json) => {
          const author = json.author.name.toLowerCase();
          const title = json.title.toLowerCase();
          const body = json.body.toLowerCase();

          return (
            author.includes(term) || title.includes(term) || body.includes(term)
          );
        });
        console.log(filteredPosts);
      });
    }

    search(json);

    for (let i = 0; i < json.length; i++) {
      feed.innerHTML += `
      <div class="post">
        <div class="user-info">
            <img src="${json[i].author.avatar}">
            <h2>${json[i].author.name}</h2>
        </div>
         <a href="single-entry.html?id=${json[i].id}">
             <p>${json[i].title}</p>
            <p>${json[i].body}</p>
         </a>
      </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

getWithToken(`${API_BASE_URL}/api/v1/social/posts/?_author=true`);
