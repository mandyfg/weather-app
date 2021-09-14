function showWeather(response){
  let tempC = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempFeel = Math.round(response.data.main.feels_like);
  let weather = (response.data.weather[0].main).toLowerCase();
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherIcon = response.data.weather[0].icon;
  let clouds = response.data.clouds.all;
  let icon = document.querySelector("#icon");
  let currentCity = document.querySelector("#city");
  let phraseTemp = document.querySelector("#phrase-temp");
  let windInfo = document.querySelector("#wind");
  icon.setAttribute ("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
  icon.setAttribute ("alt", description);
  currentCity.innerHTML = `${city}, ${country}`; 
  phraseTemp.innerHTML = `Today the maximum will be ${tempMax}°C and the minimum will be ${tempMin}°C. Forecast of ${weather}. Have a wonderful day.`
  windInfo.innerHTML = `Feels like: ${tempFeel}°C <br /> Wind: ${wind} meter / sec <br /> Humidity: ${humidity}% <br /> Cloudiness: ${clouds}%`;
  let realTemp = document.querySelector("#realTemp");
  realTemp.innerHTML = `${tempC}`
  console.log(response.data);
  celsiusTemp = tempC;
  tempFeelC = tempFeel;
  tempMaxC = tempMax;
  tempMinC = tempMin;
  weatherF = weather;
  windF = wind;
  humidityF = humidity;
  cloudsF = clouds;
}

function typedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#answer-form").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "c89dd2e06d6689349deb2d1c5444e6e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c89dd2e06d6689349deb2d1c5444e6e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeFTemp() { 
  let realTemp = document.querySelector("#realTemp");
  let tempF = Math.round ((celsiusTemp * 9) / 5 + 32);
  let tempMinF = Math.round ((tempMinC * 9) / 5 + 32);
  let tempMaxF = Math.round ((tempMaxC * 9) / 5 + 32);
  let tempFeelF = Math.round ((tempFeelC * 9) / 5 + 32);
  realTemp.innerHTML = tempF;
  let metric = document.querySelector("#realMetric");
  metric.innerHTML = "°F"
  let phraseTemp = document.querySelector("#phrase-temp");
  let windInfo = document.querySelector("#wind");
  phraseTemp.innerHTML = `Today the maximum will be ${tempMaxF}°F and the minimum will be ${tempMinF}°F. Forecast of ${weatherF}. Have a wonderful day.`
  windInfo.innerHTML = `Feels like: ${tempFeelF}°F <br /> Wind: ${windF} meter / sec <br /> Humidity: ${humidityF}% <br /> Cloudiness: ${cloudsF}%`;
}

function changeCTemp() {
  let realTemp = document.querySelector("#realTemp");
  realTemp.innerHTML = celsiusTemp;
  let metric = document.querySelector("#realMetric");
  metric.innerHTML = "°C"
  let phraseTemp = document.querySelector("#phrase-temp");
  let windInfo = document.querySelector("#wind");
  phraseTemp.innerHTML = `Today the maximum will be ${tempMaxC}°C and the minimum will be ${tempMinC}°C. Forecast of ${weatherF}. Have a wonderful day.`
  windInfo.innerHTML = `Feels like: ${tempFeelC}°C <br /> Wind: ${windF} meter / sec <br /> Humidity: ${humidityF}% <br /> Cloudiness: ${cloudsF}%`;
}

function tempChange () {
  if(tempSwitch.checked == true) {
    changeCTemp();
  } else {
    changeFTemp();
  }
}

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
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
  "December"
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

if (minutes <= 9) {
  minutes = '0' + now.getMinutes()
} else minutes = now.getMinutes();

if (hour <= 9) {
  hour = '0' + now.getHours();
} else hour = now.getHours();

let celsiusTemp = null;
let tempFeelC = null;
let tempMaxC = null;
let tempMinC = null;
let weatherF = null;
let windF = null;
let humidityF = null;
let cloudsF = null;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${month} ${date} <br /> ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener ("submit", typedCity);

let geoButton = document.querySelector("#loc");
geoButton.addEventListener ("click", getCurrentLocation);

let tempSwitch = document.querySelector("#myonoffswitch");
tempSwitch.addEventListener ("change", tempChange);

searchCity("Sao Paulo");