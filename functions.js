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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-12 tomorrow">
              <span class="day-of-week"> ${formatDay(forecastDay.dt)} </span>
              <span class="emoji-pronos"
                ><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                      alt=""
                      width="28"
                      />
              </span>
              <span class="min-temp">${Math.round(
                forecastDay.temp.min
              )}°C</span>
              <span class="max-temp"><strong>${Math.round(
                forecastDay.temp.max
              )}°C</strong></span>

              
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let units = "metric";
  let apiKey = "00ece93f77449f994396ff1b07a7d1e4";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${endpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityNameInput = searchInput.value;
  let h5 = document.querySelector("#card-city-name");
  h5.innerHTML = cityNameInput;

  search(cityNameInput);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "00ece93f77449f994396ff1b07a7d1e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//api weather

function showWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp-today");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#precip-today");
  let windSpeedElement = document.querySelector("#wind-today");
  let iconElement = document.querySelector("#icon");

  let temperature = Math.round(response.data.main.temp);
  let cityNameInput = response.data.name;
  let description = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} Kmh`;
  let h5 = document.querySelector("#card-city-name");
  h5.innerHTML = cityNameInput;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp-today");
  //remove the active class of the celsius Link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-today");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let celsiusTemperatur = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", getCurrentPosition);
search("Madrid");
