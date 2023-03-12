import { API_BASE_URL, token, userName } from "./index.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const singlePost = document.querySelector(".single-entry-container");

const getPost = async function (url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);

    singlePost.innerHTML = `
      <div class="post">
        <div class="user-info">
            <img src="${json.author.avatar}">
            <h2>${json.author.name}</h2>
        </div>
             <p>${json.title}</p>
            <p>${json.body}</p>
      </div>`;
  } catch (error) {
    console.log(error);
  }
};

getPost(`${API_BASE_URL}/api/v1/social/posts/${id}/?_author=true`);
