import { places } from "../data/places.mjs";

const showHere = document.querySelector("#discover-cards");

function displayItems(places) {
    places.forEach((place) => {

        // CARD
        const card = document.createElement("article");
        card.classList.add("card");

        // TITLE
        const name = document.createElement("h2");
        name.textContent = place.name;

        // IMAGE inside FIGURE
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = `images/${place.photo_url}`;
        image.alt = place.name;
        image.loading = "lazy";

        figure.appendChild(image);

    
        // ADDRESS (required tag)
        const address = document.createElement("address");
        address.textContent = place.address;

        const cost = document.createElement("p");
        cost.textContent = `Cost: KES ${place.cost_kes}`;

        // DESCRIPTION
        const description = document.createElement("p");
        description.textContent = place.description;

        // BUTTON TO LEARN MORE
        const button = document.createElement("button");
        button.setAttribute("aria-label", `Learn more about ${place.name}`);
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            alert(`More information about ${place.name} coming soon!`);
    });

        // APPEND EVERYTHING
        card.appendChild(name);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(cost);
        card.appendChild(description);
        card.appendChild(button);

        showHere.appendChild(card);
    });
}

displayItems(places);

const messageElement = document.querySelector("#message-text");

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - lastVisit;

    const daysBetween = Math.floor(timeDifference / 86400000);

    if (daysBetween < 1) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageElement.textContent = "You last visited 1 day ago.";
    } else {
        messageElement.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

// Store current visit
localStorage.setItem("lastVisit", now);