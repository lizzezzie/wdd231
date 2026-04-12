document.addEventListener("DOMContentLoaded", () => {

    console.log("Navigation script running");

    const menuBtn = document.querySelector("#menu-btn");
    const nav = document.querySelector(".navigation");

    console.log("Menu button:", menuBtn);
    console.log("Navigation element:", nav);

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            console.log("Menu button clicked");
            nav.classList.toggle("open");
            console.log("Menu toggled");

            menuBtn.textContent = nav.classList.contains("open") ? "✖" : "☰";
        });
    }

    menuBtn.addEventListener("click", () => {
        console.log("Menu button clicked");
        nav.classList.toggle("open");
        console.log("Menu toggled");

        // toggle icon
        if (nav.classList.contains("open")) {
            menuBtn.textContent = "✖";
        } else {
            menuBtn.textContent = "☰";
        }
    });
});
console.log("nav script loaded");