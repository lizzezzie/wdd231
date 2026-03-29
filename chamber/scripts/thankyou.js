const params = new URLSearchParams(window.location.search);

document.getElementById("first name").textContent = params.get("first name");
document.getElementById("last name").textContent = params.get("last name");
document.getElementById("email").textContent = params.get("email");
document.getElementById("number").textContent = params.get("number");
document.getElementById("business").textContent = params.get("business");
document.getElementById("timestamp").textContent = params.get("timestamp");
