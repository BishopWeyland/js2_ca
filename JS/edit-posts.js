import { API_BASE_URL, token, userName } from "./index.js";
import { id } from "./single-entry.js";

const editPost = async (url, data) => {
  if (!token) {
    throw new Error("Access token not found in localStorage");
  }
  try {
    const res = await fetch(url, {
      method: "PUT",
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

  editPost(`${API_BASE_URL}/api/v1/social/posts/${id}`, postData);
});

const deleteButton = document.querySelector(".delete-posts");

const deletePosts = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    error;
  } finally {
    window.location.href = "index.html";
  }
};

deleteButton.addEventListener("click", () => {
  deletePosts(`${API_BASE_URL}/api/v1/social/posts/${id}`);
});
