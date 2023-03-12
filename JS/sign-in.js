import { API_BASE_URL, token } from "./index.js";

async function signIn(url, data) {
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
    const accessToken = json.accessToken;
    localStorage.setItem(`accessToken`, accessToken);
    localStorage.setItem(`name`, json.name);
    if (accessToken) {
      window.location.href = "index.html";
    }
    return json;
  } catch (error) {
    console.log(error);
  }
}

const signInUser = document.querySelector("#sign-in-user");

signInUser.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    email: signInUser.email.value,
    password: signInUser.password.value,
  };

  signIn(`${API_BASE_URL}/api/v1/social/auth/login`, userData);
});

// willand_test2
// willand-test2@noroff.no
// willandpass1232
