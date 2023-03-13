/**
 * function to create posts
 * @async
 * @function createPost
 */

import { API_BASE_URL, token } from "./index.js";

const createPost = async (url, data) => {
  if (!token) {
    throw new Error("Access token not found in localStorage");
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        media: data.media,
        tags: data.tags,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    postContent.reset();
  }
};

const postContent = document.querySelector("#create-post");

postContent.addEventListener("submit", (e) => {
  e.preventDefault();
  const postData = {
    title: postContent.title.value,
    body: postContent.body.value,
  };

  createPost(`${API_BASE_URL}/api/v1/social/posts`, postData);
});
