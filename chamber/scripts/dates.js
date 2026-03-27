// ----------------------
// FOOTER
// ----------------------
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}