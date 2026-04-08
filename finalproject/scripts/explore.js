// explore.js
// URL to the insights JSON file
const url = "../data/insights.json";

async function getInsights() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        displayInsights(data);

    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function to fetch and display insights on page load
getInsights();

const container = document.querySelector("#card-container");

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

// Event delegation for dynamically created buttons
container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
    }
});

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalInsight = document.querySelector("#modal-insight");
const modalDetails = document.querySelector("#modal-details");
const closeModalBtn = document.querySelector("#close-modal");

let allInsights = [];

function displayInsights(insights) {
    allInsights = insights; // store globally

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

// Open modal with detailed insight
function openModal(id) {
    const item = allInsights.find(i => i.id === id);

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

closeModalBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
});