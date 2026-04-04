const params = new URLSearchParams(window.location.search);

document.getElementById("fname").textContent = params.get("first-name");
document.getElementById("lname").textContent = params.get("last-name");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("business").textContent = params.get("org-name");
document.getElementById("timestamp").textContent = params.get("timestamp");
