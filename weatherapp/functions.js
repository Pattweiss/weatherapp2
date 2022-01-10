function displayCurrentDate() {
  let now = new Date();
  let date = now.getDate();

  let currentDate = document.querySelector("#date");
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let months = [
    "Jan",

    "Feb",

    "March",

    "Apr",

    "May",

    "Jun",

    "Jul",

    "Aug",

    "Sep",

    "Oct",

    "Nov",

    "Dec",
  ];

  let month = months[now.getMonth()];

  currentDate.innerHTML = `${day}, ${date} ${month}  ${year} `;

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

displayCurrentDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityNameInput = searchInput.value;
  let h5 = document.querySelector("#card-city-name");
  h5.innerHTML = cityNameInput;
  let units = "metric";
  let apiKey = "00ece93f77449f994396ff1b07a7d1e4";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${endpoint}${cityNameInput}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

//api weather
function showWeather(response) {
  let cityNameInput = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let description = response.data.weather[0].description;
  console.log(description);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let temperatureElement = document.querySelector("#temp-today");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#precip-today");
  let windSpeedElement = document.querySelector("#wind-today");
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} Kmh`;
  let h5 = document.querySelector("#card-city-name");
  h5.innerHTML = cityNameInput;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "00ece93f77449f994396ff1b07a7d1e4";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${endpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", getCurrentPosition);
