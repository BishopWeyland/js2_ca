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

    for (let i = 0; i < json.length; i++) {
      feed.innerHTML += `
      <div class="post">
        <div class="user-info">
            <img src="${json[i].author.avatar}">
            <h2>${json[i].author.name}</h2>
        </div>
        <p>${json[i].title}</p>
        <p>${json[i].body}</p>
      </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

getWithToken(`${API_BASE_URL}/api/v1/social/posts/?_author=true`);
