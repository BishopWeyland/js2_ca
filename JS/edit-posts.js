const editPosts = document.querySelector(".edit-posts");
const editMenu = document.querySelector(".edit-menu");

editPosts.addEventListener("click", () => {
  editMenu.classList.toggle("edit-menu-show");
  console.log("test");
});
