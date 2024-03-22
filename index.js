function refreshWeather(response){
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let city = response.data.city ;
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date= new Date(response.data.time * 1000);
let iconElement =document.querySelector("#icon")



iconElement.innerHTML= `<img src= "${response.data.condition.icon_url}"class="weather-app-icon">`

cityElement.innerHTML= (city);
timeElement.innerHTML= formatDate(date);
descriptionElement.innerHTML=(response.data.condition.description);
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
temperatureElement.innerHTML= Math.round(temperature);

getForecast(response.data.city);
}

function formatDate(date){
    
    let minutes= date.getMinutes();
    let hours = date.getHours();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sartuday"];
    let day= days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }
return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
    let apiKey = "8e4a0bf13d97t36283b48a970944023o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchsubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity (searchInput.value);
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

return days [date.getDay()];
}


function getForecast(city){
    let apiKey = "8e4a0bf13d97t36283b48a970944023o";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=mertric`;
    axios(apiUrl).then(displayForecast);

}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = "";

    response.data.daily.forEach (function(day, index){
if (index < 5){

forecastHTML= forecastHTML + `
<div class="weather-forecast-day">
     <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src= "${day.condition.icon_url}" class="weather-forecast-icon"/>
     <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
        </span>
        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>  
 </div>
</div>`;
}
    } );

    forecastElement.innerHTML = forecastHTML;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchsubmit);

searchCity("Nigeria");

