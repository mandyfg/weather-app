//weather search on the API in °C
function showWeather(response) {
  let tempC = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempFeel = Math.round(response.data.main.feels_like);
  let weather = response.data.weather[0].main.toLowerCase();
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let windKm = Math.round(wind * 3.6);
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherIcon = response.data.weather[0].icon;
  let clouds = response.data.clouds.all;
  //updating the function results from the API globally
  celsiusTemp = tempC;
  tempFeelC = tempFeel;
  tempMaxC = tempMax;
  tempMinC = tempMin;
  weatherF = weather;
  windF = windKm;
  humidityF = humidity;
  cloudsF = clouds;
  //changes on the function
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  icon.setAttribute("alt", description);
  currentCity.innerHTML = `${city}, ${country}`;
  realTemp.innerHTML = `${celsiusTemp}`;
  realMetric = "°C";
  metric.innerHTML = realMetric;
  feelTempInfo.innerHTML = `${tempFeelC}${realMetric}`;
  humidityInfo.innerHTML = `${humidityF}%`;
  cloudInfo.innerHTML = `${cloudsF}%`;
  windInfo.innerHTML = `${windF} km/h`;
  highestTemp.innerHTML = `${tempMaxC}${realMetric}`;
  lowestTemp.innerHTML = `${tempMinC}${realMetric}`;
  //calling out the next function
  englishPage();
  tempChange();
  console.log(response.data);
}

//send city of the form to the API
function typedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#answer-form").value;
  searchCity(city);
}

//search city on the API
function searchCity(city) {
  let apiKey = "c89dd2e06d6689349deb2d1c5444e6e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//search current location on the API
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c89dd2e06d6689349deb2d1c5444e6e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

//send current location to the API
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//change temperature to °F
function changeFTemp() {
  let tempF = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempMinF = Math.round((tempMinC * 9) / 5 + 32);
  let tempMaxF = Math.round((tempMaxC * 9) / 5 + 32);
  let tempFeelF = Math.round((tempFeelC * 9) / 5 + 32);
  realTemp.innerHTML = tempF;
  realMetric = "°F";
  metric.innerHTML = realMetric; //"°F"
  feelTempInfo.innerHTML = `${tempFeelF}${realMetric}`;
  highestTemp.innerHTML = `${tempMaxF}${realMetric}`;
  lowestTemp.innerHTML = `${tempMinF}${realMetric}`;
  clockUpdate();
  //aqui colocar uma color change em F
}

//change temperature to °C
function changeCTemp() {
  realTemp.innerHTML = celsiusTemp;
  realMetric = "°C";
  metric.innerHTML = realMetric; //"°C";
  feelTempInfo.innerHTML = `${tempFeelC}${realMetric}`;
  highestTemp.innerHTML = `${tempMaxC}${realMetric}`;
  lowestTemp.innerHTML = `${tempMinC}${realMetric}`;
  clockUpdate();
  //colorChange();
}

//check temperature switch
function tempChange() {
  if (tempSwitch.checked == true) {
    changeCTemp();
  } else {
    changeFTemp();
  }
}

// update clock
function clockUpdate() {
  currentTime.innerHTML = `${hour}:${minutes}`;
}

//update day and month
function dateUpdate() {
  currentDay.innerHTML = `${englishDay}, ${englishMonth} ${date}`;
}

// update color
function colorChange() {
  if (tempC < 18) {
    document.getElementsByClassName("container").style.background = "blue";
  }
}

// change language to English
function englishPage() {
  if (hour < 18) {
    tempPhrase.innerHTML = `Forecast of ${weatherF}. Have a wonderful day!`;
  } else {
    tempPhrase.innerHTML = `Forecast of ${weatherF}. Good night!`;
  }
  windPhrase.innerHTML = `Wind: `;
  feelPhrase.innerHTML = `Feels like: `;
  humidityPhrase.innerHTML = `Humidity: `;
  cloudPhrase.innerHTML = `Cloudiness:`;
  clockUpdate();
  dateUpdate();
}

// change language to Portuguese
function portuguesePage() {
  if (hour < 18) {
    tempPhrase.innerHTML = `Bom dia!`;
  } else {
    tempPhrase.innerHTML = `Boa noite!`;
  }
  windPhrase.innerHTML = `Vento: `;
  feelPhrase.innerHTML = `Sensação térmica: `;
  humidityPhrase.innerHTML = `Umidade: `;
  cloudPhrase.innerHTML = `Chuva: `;
  currentDay.innerHTML = `${portugueseDay}, ${portugueseMonth} ${date}`;
  clockUpdate();
}

// change language to Spanish
function spanishPage() {
  if (hour < 18) {
    tempPhrase.innerHTML = `Buen día!`;
  } else {
    tempPhrase.innerHTML = `Buenas noches!`;
  }
  windPhrase.innerHTML = `Viento: `;
  feelPhrase.innerHTML = `Sensación térmica: `;
  humidityPhrase.innerHTML = `Humedad: `;
  cloudPhrase.innerHTML = `Nubosidad: `;
  currentDay.innerHTML = `${spanishDay}, ${spanishMonth} ${date}`;
  clockUpdate();
}

// change language to French
function frenchPage() {
  if (hour < 18) {
    tempPhrase.innerHTML = `Bonne journée!`;
  } else {
    tempPhrase.innerHTML = `Bonne nuit!`;
  }
  windPhrase.innerHTML = `Vent moyen: `;
  feelPhrase.innerHTML = `T. ressentie: `;
  humidityPhrase.innerHTML = `Humidité: `;
  cloudPhrase.innerHTML = `Nébulosité: `;
  currentDay.innerHTML = `${frenchDay}, ${frenchMonth} ${date}`;
  clockUpdate();
}

//current date + month
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
  "December",
];
let englishMonth = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let englishDay = days[now.getDay()];

//portuguese days + months
let portugueseDays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
let portugueseMonths = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
let portugueseDay = portugueseDays[now.getDay()];
let portugueseMonth = portugueseMonths[now.getMonth()];

//french days + months
let frenchDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
let frenchMonths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
let frenchDay = frenchDays[now.getDay()];
let frenchMonth = frenchMonths[now.getMonth()];

//spanish days + months
let spanishDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
let spanishMonths = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octobre",
  "Noviembre",
  "Diciembre",
];
let spanishDay = spanishDays[now.getDay()];
let spanishMonth = spanishMonths[now.getMonth()];

//add zeros to the minutes/hours under 9.
if (minutes <= 9) {
  minutes = "0" + now.getMinutes();
} else minutes = now.getMinutes();

if (hour <= 9) {
  hour = "0" + now.getHours();
} else hour = now.getHours();

//variables used on functions to be updated
let celsiusTemp = null;
let tempFeelC = null;
let tempMaxC = null;
let tempMinC = null;
let weatherF = null;
let windF = null;
let humidityF = null;
let cloudsF = null;
let realMetric = null;

//variables used for innerHTML on all functions
let icon = document.querySelector("#icon");
let currentCity = document.querySelector("#city");
let realTemp = document.querySelector("#realTemp");
let metric = document.querySelector("#realMetric");
let windInfo = document.querySelector("#wind-answer");
let cloudInfo = document.querySelector("#cloud-answer");
let humidityInfo = document.querySelector("#hum-answer");
let feelTempInfo = document.querySelector("#feel-answer");
let currentTime = document.querySelector("#current-time");
let currentDay = document.querySelector("#current-day");
let feelPhrase = document.querySelector("#feel");
let windPhrase = document.querySelector("#wind");
let humidityPhrase = document.querySelector("#humidity");
let tempPhrase = document.querySelector("#phrase-temp");
let cloudPhrase = document.querySelector("#cloudiness");
let highestTemp = document.querySelector("#highest-temp");
let lowestTemp = document.querySelector("#lowest-temp");

//current city
let form = document.querySelector("#search-form");
form.addEventListener("submit", typedCity);

//current location
let geoButton = document.querySelector("#loc");
geoButton.addEventListener("click", getCurrentLocation);

//current temperature
let tempSwitch = document.querySelector("#myonoffswitch");
tempSwitch.addEventListener("change", tempChange);

//english language button
let englishButton = document.querySelector("#english");
englishButton.addEventListener("click", englishPage);

//spanish language button
let spanishButton = document.querySelector("#spanish");
spanishButton.addEventListener("click", spanishPage);

//portuguese language button
let portugueseButton = document.querySelector("#portuguese");
portugueseButton.addEventListener("click", portuguesePage);

//french language button
let frenchButton = document.querySelector("#french");
frenchButton.addEventListener("click", frenchPage);

//calling functions to start the page
clockUpdate();
dateUpdate();
getCurrentLocation();
