// URL to JSON
const url = "./data/insights.json";

// DOM elements
const container = document.querySelector("#card-container");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalInsight = document.querySelector("#modal-insight");
const modalDetails = document.querySelector("#modal-details");
const closeModalBtn = document.querySelector("#close-modal");

let allInsights = [];

// FETCH DATA
async function getInsights() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data); // Debugging log
        allInsights = data; // Store data for filtering

        displayInsights(data);

    } catch (error) {
        console.error("Error:", error);
    }
}

// DISPLAY CARDS
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

// EVENT DELEGATION
container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
    }
});

// MODAL
function openModal(id) {
    const item = allInsights.find(i => i.id === id);
    if (!item) return;

    currentInsight = item;

    modalTitle.textContent = item.title;
    modalInsight.textContent = item.quickInsight;

    modalDetails.innerHTML = `
        <p><strong>Meaning:</strong> ${item.meaning}</p>
        <ul>
            ${item.actionSteps.map(step => `<li>${step}</li>`).join("")}
        </ul>
        <p><strong>Reflection:</strong> ${item.reflection}</p>
    `;

    modal.setAttribute("aria-hidden", "false");
}

// CLOSE MODAL
closeModalBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
});

// INIT
getInsights();

// FILTER BUTTONS
const filterButtons = document.querySelectorAll(".filter-buttons button");

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