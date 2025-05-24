const apiKey = "06572809013e8f635db7d11104848ac0"; // Your API key here

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    showError();
  }
}

function updateUI(data) {
  const condition = data.weather[0].main.toLowerCase();

  document.getElementById("weatherCondition").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = Math.round(data.main.temp);
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("windSpeed").textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h

  document.querySelector(".weather-info").classList.remove("hidden");
  document.getElementById("errorMessage").classList.add("hidden");

  setBackground(condition);
}

function showError() {
  document.querySelector(".weather-info").classList.add("hidden");
  document.getElementById("errorMessage").classList.remove("hidden");
}

function setBackground(condition) {
  const body = document.body;
  body.style.background = "linear-gradient(to bottom, #cceeff, #ffffff)"; // default

  if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(to bottom, #d3d3d3, #ffffff)";
  } else if (condition.includes("rain")) {
    body.style.background = "linear-gradient(to bottom, #6e7f80, #cceeff)";
  } else if (condition.includes("clear")) {
    body.style.background = "linear-gradient(to bottom, #87cefa, #ffffff)";
  } else if (condition.includes("snow")) {
    body.style.background = "linear-gradient(to bottom, #f0f8ff, #ffffff)";
  }
}
