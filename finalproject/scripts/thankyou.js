document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const focus = params.get("focus");
    const reflection = params.get("reflection");
    const goal = params.get("goal");

    const focusMap = {
        emotional: "Emotional Wellbeing",
        growth: "Personal Growth",
        health: "Physical Health"
    };

    const nameEl = document.querySelector("#name");
    const focusEl = document.querySelector("#focus");
    const reflectionEl = document.querySelector("#reflection");
    const goalEl = document.querySelector("#goal");
    const section = document.querySelector("main section");

    // If core structure missing, stop safely
    if (!section) return;

    // If no data exists
    if (!name && !reflection && !goal) {
        section.innerHTML = `
            <h2>No reflection data found</h2>
            <p>Please submit the form first.</p>
            <a href="reflect.html" class="btn">Go to Reflection Form</a>
        `;
        return;
    }

    // Safe rendering
    if (nameEl) nameEl.textContent = name || "Anonymous";
    if (focusEl) focusEl.textContent = focusMap[focus] || "Not specified";
    if (reflectionEl) reflectionEl.textContent = reflection || "No reflection provided.";
    if (goalEl) goalEl.textContent = goal || "No goal provided.";
});