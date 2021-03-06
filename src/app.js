//weather search on the API in °C
function showWeather(response) {
  let tempC = Math.round(response.data.main.temp);
  let tempFeel = Math.round(response.data.main.feels_like);
  let weather = response.data.weather[0].main.toLowerCase();
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let windKm = Math.round(wind * 3.6);
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherIcon = response.data.weather[0].icon;
  let coords = response.data.coord;
  let clouds = response.data.clouds.all;
  //updating the function API results to variables globally
  celsiusTemp = tempC;
  tempFeelC = tempFeel;
  weatherF = weather;
  windF = windKm;
  humidityF = humidity;
  cloudsF = clouds;
  lat = coords.lat;
  lon = coords.lon;
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
  tempChange();
}

//search forecast on the API
function searchForecast () {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

//format dates of forecast
function formatDay (timestamp) {
  let date = new Date(timestamp * 1000); 
  let day = date.getDay();
  let english = document.getElementById("english");
  let spanish = document.getElementById("spanish");
  let portuguese = document.getElementById("portuguese");
  let french = document.getElementById("french");
  forecastTimestamp = day
  if (english.checked === true) {
  return days[forecastTimestamp];
  } else if (spanish.checked === true) {
    return spanishDays[forecastTimestamp];
  } else if (portuguese.checked === true) {
    return portugueseDays[forecastTimestamp];
  } else if (french.checked === true) {
    return frenchDays[forecastTimestamp];
  } else {
    return days[forecastTimestamp];
  }
}

//show forecast
function showForecast(response) {
  console.log(response.data);
  let forecastInfo = response.data.daily;
  let forecastCode = `<div class="row" id="forecast">`;
  forecastInfo.map(function (forecastDay, index) {    
 if (index < 5) {
  let forecastMax = Math.round(forecastDay.temp.max);
  let forecastMin = Math.round(forecastDay.temp.min);
  let forecastDate = forecastDay.dt
  forecastCode = forecastCode + `
  <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <span class="forecast-day">${formatDay (forecastDate)}</span>                            
                            <br />
                            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
                            <br />
                            <p id="forecast-temp"> <span class="temperature-forecast-max">${forecastMax}° </span> 
                            <span class="temperature-forecast-min">/ ${forecastMin}°</span>
                            </p>
                        </div>
                    </div>
                </div>`;
forecastDaily = forecastInfo;
forecastMaxC = forecastMax;
forecastMinC = forecastMin;
}
});
forecastCode = forecastCode + `</div>`;
forecast.innerHTML = forecastCode;
}

//send city of the form to the API
function typedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#answer-form").value;
  searchCity(city);
}

//search city on the API
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//search current location on the API
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
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
  let tempFeelF = Math.round((tempFeelC * 9) / 5 + 32);
  realTemp.innerHTML = tempF;
  realMetric = "°F";
  metric.innerHTML = realMetric; //"°F"
  feelTempInfo.innerHTML = `${tempFeelF}${realMetric}`;
  clockUpdate();
  
// function again to loop + change weather
function searchForecastF () {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecastF);
};
searchForecastF();
function showForecastF(response) {
let forecastInfo = response.data.daily;
let forecastCode = '';
forecastInfo.forEach(function (forecastDay, index) {   
 if (index < 5) {
  let forecastMaxC = Math.round(forecastDay.temp.max);
  let forecastMinC = Math.round(forecastDay.temp.min);
  let forecastMaxF = Math.round((forecastMaxC * 9) / 5 + 32);
  let forecastMinF = Math.round((forecastMinC * 9) / 5 + 32);
  let forecastDate = forecastDay.dt
  forecastCode = forecastCode + `
  <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <span class="forecast-day">${formatDay (forecastDate)}</span>                            
                            <br />
                            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
                            <br />
                            <p> <span class="temperature-forecast-max">${forecastMaxF}° </span> 
                            <span class="temperature-forecast-min">/ ${forecastMinF}°</span>
                            </p>
                        </div>
                    </div>
                </div>`;                
forecastCode = forecastCode + `</div>`;     
}
});
forecastCode = forecastCode + `</div>`;
forecast.innerHTML = forecastCode;
}
}

//change temperature to °C
function changeCTemp() {
  realTemp.innerHTML = celsiusTemp;
  realMetric = "°C";
  metric.innerHTML = realMetric; //"°C";
  feelTempInfo.innerHTML = `${tempFeelC}${realMetric}`;
  clockUpdate();
searchForecast();
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
  if (date === 1) {
currentDay.innerHTML = `${englishDay}, ${englishMonth} ${date}st`;
  } else if (date === 2) {
    currentDay.innerHTML = `${englishDay}, ${englishMonth} ${date}nd`;
  } else if (date === 3) {
    currentDay.innerHTML = `${englishDay}, ${englishMonth} ${date}rd`;
  } else {
    currentDay.innerHTML = `${englishDay}, ${englishMonth} ${date}`;
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
  searchForecast();
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
  currentDay.innerHTML = `${portugueseDay}, ${date} de ${portugueseMonth}`;
  clockUpdate();    
  searchForecast();
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
  currentDay.innerHTML = `${spanishDay}, ${date} de ${spanishMonth}`;
  clockUpdate();
  searchForecast();
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
  currentDay.innerHTML = `${frenchDay}, ${date} ${frenchMonth}`;
  clockUpdate();  
  searchForecast();
}

//function for dark mode
function darkMode() {
  let darkBackground = document.getElementById("background");
  let container = document.getElementById("container");
  let darkForm = document.getElementById("answer-form");
  let page = document.getElementById("page");
  let language = document.getElementById("language");
  darkBackground.style.backgroundColor = "#1a2639";
  darkBackground.style.color = "white";
  darkForm.style.backgroundColor = "#1a2639";
  darkForm.style.color = "white";
  container.style.backgroundColor =  "#3e4a61";
  page.style.color = "white";
  language.style.color = "white";
}

//function for light mode
function lightMode() {
  let lightBackground = document.getElementById("background");
  let lightForm = document.getElementById("answer-form");  
  let container = document.getElementById("container");
  let page = document.getElementById("page");  
  let language = document.getElementById("language");  
  lightBackground.style.backgroundColor = "#f7f7f7"; 
  lightForm.style.backgroundColor = "white";
  lightForm.style.color = "black";
  container.style.backgroundColor = "#aeccc6";
  lightBackground.style.color = "black";
  page.style.color = "black";
  language.style.color = "black"
}

//function for theme switch
function themeFunction() {
  if (sun.classList.toggle("visible") === true) {
    lightMode();
  } else if (moon.classList.toggle("visible")) {
    darkMode();
  } else (sun.classList.toggle("visible"));
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
let weatherF = null;
let windF = null;
let humidityF = null;
let cloudsF = null;
let realMetric = null;
let forecastMaxC = null;
let forecastMinC = null;
let forecastTimestamp = null;
let forecastDaily = null;
let lat = null;
let lon = null;
let apiKey = "c89dd2e06d6689349deb2d1c5444e6e1";

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
let forecast = document.querySelector("#forecast");
let forecastWeekDay = document.querySelector("#forecast-day");

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

//dark mode switch
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let themeButton = document.querySelector(".container-1");
themeButton.addEventListener("click", themeFunction);

//calling functions to start the page
clockUpdate();
dateUpdate();
getCurrentLocation();