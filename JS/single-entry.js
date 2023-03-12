/**
 * Queystring params to get id of individual posts.
 * @async
 * @function getPost
 */

import { API_BASE_URL, token, userName } from "./index.js";
export { id };

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
    const item = await res.json();
    console.log(item);
    const postContainer = document.querySelector(".post-container");
    const removePostForm =
      item.author.name === userName
        ? ""
        : `${(postContainer.style.display = "none")}`;

    const avatar = item.author.avatar
      ? `<img src="${item.author.avatar}"/>`
      : '<div class="no-avatar"><i class="fa-solid fa-user"></i></div>';

    const media = item.media ? `<img src="${item.media}"/>` : "";
    singlePost.innerHTML = `
            <div class="post single-post">
                <div class="user-info-container">
                    <div class="user-info">
                        ${avatar}
                        <h2>${item.author.name}</h2>
                    </div> 
                    
                </div>
                <a href="single-entry.html?id=${item.id}">
                <p class="title">${item.title}</p>
                ${media}
                <p>${item.body}</p>
                </a>
            </div>`;
  } catch (error) {
    console.log(error);
  }
};

getPost(`${API_BASE_URL}/api/v1/social/posts/${id}/?_author=true`);
