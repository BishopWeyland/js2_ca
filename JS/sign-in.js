import { API_BASE_URL, token } from "./index.js";
import { checkLength, validateEmail } from "./form-validation.mjs";

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
    alert("We are sorry an error had occured!", error);
  }
}

const signInUser = document.querySelector("#sign-in-user");

signInUser.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signInUser.email.value.trim();
  const password = signInUser.password.value.trim();

  if (!checkLength(password, 8)) {
    alert("Password needs to be atleast 5 characters!");
    return;
  }
  if (!validateEmail(email)) {
    alert("You must use a noroff e-mail!");
    return;
  }

  const userData = {
    email: email,
    password: password,
  };

  signIn(`${API_BASE_URL}/api/v1/social/auth/login`, userData);
});

// willand_test2
// willand-test2@noroff.no
// willandpass1232
