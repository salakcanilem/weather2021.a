let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

function showWeather(response) {
  console.log(response.data);

  let h1 = document.querySelector("h1");
  let city = response.data.name;
  h1.innerHTML = `${city}`;

  let current = document.querySelector("#current");
  current.innerHTML = response.data.weather[0].description;

  let temp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `Temperature:  ${temperature}°C`;

  let humid = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = `Humidity:  ${humidity}%`;

  let winds = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  winds.innerHTML = `WindSpeed:  ${humidity}m/h`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "dc136bfb6fcb8196352077908cb047e0";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function retrieveCurrentPosition(position) {
  let apiKey = "dc136bfb6fcb8196352077908cb047e0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
