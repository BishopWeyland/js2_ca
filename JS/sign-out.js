const signOutBtn = document.querySelector(".sign-out");

signOutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "user-log-on.html";
});
