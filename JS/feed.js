const API_BASE_URL = "https://api.noroff.dev";
const feed = document.querySelector(".feed-container");

async function getWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("name");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    let filteredData = json;

    const searchForm = document.querySelector("#search-input");
    searchForm.addEventListener("keyup", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm !== "") {
        filteredData = json.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.author.name.toLowerCase().includes(searchTerm) ||
            item.body.toLowerCase().includes(searchTerm)
          );
        });
      } else {
        filteredData = json;
      }

      feed.innerHTML = "";

      filteredData.forEach((item) => {
        feed.innerHTML += `      <div class="post">
        <div class="user-info">
            <img src="${item.author.avatar}">
            <h2>${item.author.name}</h2>
        </div>
         <a href="single-entry.html?id=${item.id}">
             <p>${item.title}</p>
            <p>${item.body}</p>
         </a>
      </div>`;
      });
      if (!filteredData.length) {
        feed.innerHTML = "no results";
      }
    });

    json.forEach((item) => {
      feed.innerHTML += `
    <div class="post">
      <div class="user-info">
        
        ${
          item.author.avatar
            ? '<img src="${item.author.avatar}">'
            : '<div class="no-avatar"><i class="fa-solid fa-user"></i></div>'
        }
        <h2>${item.author.name}</h2>
      </div>
      <a href="single-entry.html?id=${item.id}">
        <p>${item.title}</p>
        <p>${item.body}</p>
      </a>
      ${item.author.name === userName ? "<button>Delete</button>" : ""}
    </div>`;
    });

    function myPosts() {
      let userPosts = [];
      for (let i = 0; i < json.length; i++) {
        if (json[i].author.name === userName) {
          userPosts.push(json[i]);
        }
      }
      return userPosts;
    }

    console.log(myPosts());
  } catch (error) {
    console.log(error);
  }

  const postsSelect = document.querySelector("#select-posts");
  const selectPosts = (e) => {
    if ((postsSelect.value = "my-posts")) {
    }
  };
}

getWithToken(`${API_BASE_URL}/api/v1/social/posts/?_author=true`);
