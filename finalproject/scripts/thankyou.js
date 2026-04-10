// Get URL parameters
const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const focus = params.get("focus");
const reflection = params.get("reflection");
const goal = params.get("goal");

// Map for better display
const focusMap = {
    emotional: "Emotional Wellbeing",
    growth: "Personal Growth",
    health: "Physical Health"
};

// Display values
document.querySelector("#name").textContent = name || "Anonymous";
document.querySelector("#focus").textContent = focusMap[focus] || "Not specified";
document.querySelector("#reflection").textContent = reflection || "No reflection provided.";
document.querySelector("#goal").textContent = goal || "No goal provided.";

// If no data, show message
if (!name && !reflection && !goal) {
    document.querySelector(".thankyou-section").innerHTML = `
        <h2>No reflection data found</h2>
        <p>Please submit the form first.</p>
        <a href="reflect.html">Go to Reflection Form</a>
    `;
}