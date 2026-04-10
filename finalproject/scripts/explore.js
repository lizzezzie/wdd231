// URL to JSON
const url = "./data/insights.json";

// DOM elements
const container = document.querySelector("#card-container");
const filterButtons = document.querySelectorAll(".filter-buttons button");

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalInsight = document.querySelector("#modal-insight");
const modalDetails = document.querySelector("#modal-details");
const closeModalBtn = document.querySelector("#close-modal");
const saveBtn = document.querySelector("#save-btn");

const savedContainer = document.querySelector("#saved-container");

// STATE
let allInsights = [];
let currentInsight = null;
let lastFocusedElement = null;

// ================= FETCH =================
async function getInsights() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);

        allInsights = data;
        displayInsights(data);

    } catch (error) {
        console.error("Error:", error);
    }
}

// ================= DISPLAY =================
function displayInsights(insights) {
    container.innerHTML = "";

    insights.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.quickInsight}</p>
            <button data-id="${item.id}">Read More</button>
        `;

        container.appendChild(card);
    });
}

// ================= FILTER =================
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        if (category === "all") {
            displayInsights(allInsights);
        } else {
            const filtered = allInsights.filter(item => item.category === category);
            displayInsights(filtered);
        }
    });
});

// ================= EVENT DELEGATION =================
container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
    }
});

// ================= MODAL =================
function openModal(id) {
    const item = allInsights.find(i => i.id === id);
    if (!item) return;

    currentInsight = item;
    lastFocusedElement = document.activeElement;

    modalTitle.textContent = item.title;
    modalInsight.textContent = item.quickInsight;

    modalDetails.innerHTML = `
        <p><strong>Meaning:</strong> ${item.meaning}</p>
        <ul>
            ${item.actionSteps.map(step => `<li>${step}</li>`).join("")}
        </ul>
        <p><strong>Reflection:</strong> ${item.reflection}</p>
    `;

    saveBtn.textContent = "Save Insight";

    modal.setAttribute("aria-hidden", "false");
    closeModalBtn.focus();
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true");

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

// Close button
closeModalBtn.addEventListener("click", closeModal);

// Click outside
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// ================= SAVE =================
saveBtn.addEventListener("click", () => {
    if (!currentInsight) return;

    let saved = JSON.parse(localStorage.getItem("savedInsights")) || [];

    const exists = saved.some(item => item.id === currentInsight.id);

    if (!exists) {
        saved.push(currentInsight);
        localStorage.setItem("savedInsights", JSON.stringify(saved));

        saveBtn.textContent = "Saved!";
        loadSavedInsights();
    } else {
        saveBtn.textContent = "Already Saved";
    }
});

// ================= LOAD SAVED =================
function loadSavedInsights() {
    const saved = JSON.parse(localStorage.getItem("savedInsights")) || [];

    savedContainer.innerHTML = "";

    if (saved.length === 0) {
        savedContainer.innerHTML = "<p>No saved insights yet.</p>";
        return;
    }

    saved.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.quickInsight}</p>
        `;

        savedContainer.appendChild(card);
    });
}

// ================= INIT =================
getInsights();
loadSavedInsights();