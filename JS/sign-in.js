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
    const accessToken = json.accessToken;
    localStorage.setItem(`accessToken`, accessToken);
    return json;
  } catch (error) {
    console.log(error);
  } finally {
    window.location.href = "feed.html";
  }
}

const signInUser = document.querySelector("#sign-in-user");

signInUser.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    email: signInUser.email.value,
    password: signInUser.password.value,
  };

  registerUser(`${API_BASE_URL}/api/v1/social/auth/login`, userData);
});

// willand_test2
// willand-test2@noroff.no
// willandpass1232
