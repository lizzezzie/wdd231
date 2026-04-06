import { places } from "../data/places.mjs";

const showHere = document.querySelector("#discover-cards");

function displayItemss(places) {
    places.forEach(place => {
        const theCard = document.createElement("div");
        const theImage = document.createElement("img");
        theImage.src = place.photo_url;
        theImage.alt = place.name;
        theCard.appendChild(theImage);
        const theName = document.createElement("h2");
        theName.textContent = place.name;
        theName.innerText = place.name;
        theCard.appendChild(theName);
        const theAddress = document.createElement("p");
        theAddress.textContent = place.address;
        theAddress.innerText = place.address;
        theCard.appendChild(theAddress);
        const theCost = document.createElement("p");
        theCost.textContent = `Cost: ${place.cost_kes}`;
        theCost.innerText = `Cost: ${place.cost_kes}`;
        theCard.appendChild(theCost);
        const theDescription = document.createElement("p");
        theDescription.textContent = place.description;
        theDescription.innerText = place.description;
        theCard.appendChild(theDescription);

        showHere.appendChild(theCard);


    });
}
displayItemss(places);