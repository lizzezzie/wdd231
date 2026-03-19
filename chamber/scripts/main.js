const url = "https://api.openweathermap.org/data/2.5/forecast?lat=-1.286389&lon=36.817223&appid=YOUR_API_KEY&units=metric";

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

getWeather();


function displayWeather(data) {
    const temp = document.querySelector("#temp");
    const description = document.querySelector("#description");

    const current = data.list[0];

    temp.textContent = `${current.main.temp}°C`;
    description.textContent = current.weather[0].description;
}

function displayForecast(data) {
    const forecastList = document.querySelector("#forecast-list");
    forecastList.innerHTML = "";

    const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    filtered.slice(0, 3).forEach(day => {
        const li = document.createElement("li");
        li.textContent = `${day.dt_txt.split(" ")[0]}: ${day.main.temp}°C`;
        forecastList.appendChild(li);
    });
}
displayForecast(data);



const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// FOOTER YEAR
const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

// LAST MODIFIED
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;