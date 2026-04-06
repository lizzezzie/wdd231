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

        // DESCRIPTION
        const description = document.createElement("p");
        description.textContent = place.description;

        // BUTTON (required)
        const button = document.createElement("button");
        button.textContent = "Learn More";

        // APPEND EVERYTHING
        card.appendChild(name);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        showHere.appendChild(card);
    });
}

displayItems(places);