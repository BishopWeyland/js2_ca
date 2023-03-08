const URL = "https://api.noroff.dev";
const token = localStorage.getItem("accessToken");

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

  createPost(`${URL}/api/v1/social/posts`, postData);
});

// const postContent = {
//   title: "new test",
//   body: "This is a test...",
//   media: "",
//   tags: ["test"],
// };
