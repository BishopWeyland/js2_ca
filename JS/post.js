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
    const postData = await res.json();
    return postData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const postContent = {
  title: "test post",
  body: "This is a test...",
  media:
    "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  tags: ["test"],
};

// createPost(`${URL}/api/v1/social/posts`, postContent);
