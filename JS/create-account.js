const API_BASE_URL = "https://api.noroff.dev";

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  } finally {
    window.location.href = "sign-in.html";
  }
}

const createUser = document.querySelector("#create-user-form");

createUser.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    name: createUser.username.value,
    email: createUser.email.value,
    password: createUser.password.value,
  };

  registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, userData);
});
