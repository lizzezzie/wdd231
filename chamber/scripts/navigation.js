// ----------------------
// MENU TOGGLE
// ----------------------
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".navigation");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");


        // toggle icon
        if (nav.classList.contains("open")) {
            menuBtn.textContent = "✖";
        } else {
            menuBtn.textContent = "☰";
        }
    });
}
