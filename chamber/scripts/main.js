// ----------------------
// MENU TOGGLE
// ----------------------
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".navigation");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");


        // toggle icon
        if (nav.classList.contains("open")) {
            menuBtn.textContent = "✖";
        } else {
            menuBtn.textContent = "☰";
        }
    });
}


// ----------------------
// FOOTER
// ----------------------
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}


// ----------------------
// WEATHER
// ----------------------
const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=-1.286389&lon=36.817223&appid=8c6b49019014a933d41fcf6eb93e7003&units=metric";

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        console.log("WEATHER DATA:", data);

        if (data.cod !== "200") {
            throw new Error(data.message);
        }

        displayWeather(data);
        displayForecast(data);

    } catch (error) {
        console.error("Weather error:", error);

        document.querySelector("#temp").textContent = "Unavailable";
        document.querySelector("#description").textContent = "Weather unavailable";
    }
}

getWeather();


// CURRENT WEATHER
function displayWeather(data) {
    const temp = document.querySelector("#temp");
    const description = document.querySelector("#description");

    const current = data.list[0];

    if (temp) temp.textContent = `${Math.round(current.main.temp)}°C`;
    if (description) description.textContent = current.weather[0].description;
}


// 3-DAY FORECAST
function displayForecast(data) {
    const forecastList = document.querySelector("#forecast-list");
    if (!forecastList) return;

    forecastList.innerHTML = "";

    const filtered = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    const threeDays = filtered.slice(0, 3);

    threeDays.forEach(day => {
        const li = document.createElement("li");

        const date = new Date(day.dt_txt);
        const formattedDate = date.toLocaleDateString("en-KE", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });

        li.textContent = `${formattedDate}: ${Math.round(day.main.temp)}°C`;
        forecastList.appendChild(li);
    });
}


// ----------------------
// SPOTLIGHTS
// ----------------------
const membersURL = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();

        displaySpotlights(data.members);

    } catch (error) {
        console.error("Members fetch error:", error);
    }
}

getMembers();


function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    if (!container) return;

    // Filter Gold & Silver safely
    const qualified = members.filter(member => {
        const level = member.membership.trim().toLowerCase();
        return level === "gold" || level === "silver";
    });

    // Shuffle (simple)
    const shuffled = qualified.sort(() => 0.5 - Math.random());

    // Pick 2 or 3
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);

    container.innerHTML = "";

    selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership: ${member.membership}</p>
        `;

        container.appendChild(card);
    });
}