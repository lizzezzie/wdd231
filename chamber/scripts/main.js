// ----------------------
// MENU TOGGLE
// ----------------------
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// ----------------------
// FOOTER
// ----------------------
const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;


// ----------------------
// WEATHER API
// ----------------------
const url = "https://api.openweathermap.org/data/2.5/forecast?lat=-1.286389&lon=36.817223&appid=YOUR_REAL_API_KEY&units=metric";

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if API returned valid data
        if (!data.list) {
            throw new Error("Invalid weather data");
        }

        displayWeather(data);
        displayForecast(data);

    } catch (error) {
        console.error("Error fetching weather:", error);

        document.querySelector("#temp").textContent = "Unavailable";
        document.querySelector("#description").textContent = "Weather unavailable";
    }
}

getWeather();


// ----------------------
// DISPLAY CURRENT WEATHER
// ----------------------
function displayWeather(data) {
    const temp = document.querySelector("#temp");
    const description = document.querySelector("#description");

    const current = data.list[0];

    temp.textContent = `${Math.round(current.main.temp)}°C`;
    description.textContent = current.weather[0].description;
}


// ----------------------
// DISPLAY 3-DAY FORECAST
// ----------------------
function displayForecast(data) {
    const forecastList = document.querySelector("#forecast-list");
    forecastList.innerHTML = "";

    // Filter for midday forecasts
    const filtered = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    // Take first 3 days
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