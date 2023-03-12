import { API_BASE_URL, token, userName } from "./index.js";

const feed = document.querySelector(".feed-container");

if (!token) {
  window.location.href = "user-log-on.html";
}

async function getWithToken(url) {
  try {
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

      renderPosts(filteredData);
    });

    function myPosts() {
      return json.filter((item) => item.author.name === userName);
    }

    const postsSelect = document.querySelector("#select-posts");

    postsSelect.addEventListener("change", (e) => {
      if (e.target.value === "my-posts") {
        filteredData = myPosts();
      } else {
        filteredData = json;
      }

      renderPosts(filteredData);
    });

    function renderPosts(posts) {
      feed.innerHTML = "";
      if (!posts.length) {
        feed.innerHTML = "no results";
      } else {
        posts.forEach((item) => {
          const avatar = item.author.avatar
            ? `<img src="${item.author.avatar}"/>`
            : '<div class="no-avatar"><i class="fa-solid fa-user"></i></div>';
          const editButton =
            item.author.name === userName
              ? '<button class"edit-posts"><i class="fa-solid fa-ellipsis"></i></button>'
              : "";
          const media = item.media ? `<img src="${item.media}"/>` : "";
          feed.innerHTML += `
            <div class="post">
                <div class="user-info-container">
                    <div class="user-info">
                        ${avatar}
                        <h2>${item.author.name}</h2>
                    </div> 
                    <div>${editButton}</div>
                </div>
                <a href="single-entry.html?id=${item.id}">
                <p class="title">${item.title}</p>
                ${media}
                <p>${item.body}</p>
                </a>
              
            </div>`;
        });
      }
    }

    renderPosts(filteredData);
  } catch (error) {
    console.log(error);
  }
}

getWithToken(`${API_BASE_URL}/api/v1/social/posts/?_author=true`);
