
function formatDate(timestamp) {
    let date = new Date(timestamp);
    
    let h2 = document.querySelector("h2");
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
  
    h2.innerHTML = `${day}| ${hours}:${minutes}`;
  }
  formatDate(new Date())
  
  function dateFormat(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days[day];
  }
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
  
    forecast.forEach(function (day, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          ` 
        <div class="col-2">
                  <div class="forcast-date">${dateFormat(day.dt)}</div>
                  <img src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png" alt="" width="42" />
                  <div class="forecast-temp">
                    <span class="max-temp">${Math.round(day.temp.max)}°-</span>
                    <span class="min-temp">${Math.round(day.temp.min)}°</span>
                  </div>
                </div>
                `;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "dff5c692192605ee5ed7f95b423ae857";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  
  function displayWeatherCondition(response){
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#city").innerHTML=response.data.name;
    document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp)
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    document.querySelector("#description").innerHTML=response.data.weather[0].main;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
   
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  
    getForecast(response.data.coord);
  
  }
  
  function search(city) {
    
    let apiKey="22e66ee2d2a721734b8e74a67df9f4ab" 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
  axios.get(apiUrl).then(displayWeatherCondition);}
  
  function handleSubmit (event){
    event.preventDefault();
    let city=document.querySelector("#city-input").value;
    search (city)}
   
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit",handleSubmit);
  search("Kermanshah")
  
  function searchLocation(position){
    let apiKey = "22e66ee2d2a721734b8e74a67df9f4ab"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event){
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
   
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  }
  function convertToCelsius(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);}
  
    let celciusTemperature= null;
  
  let currentLocationButton = document.querySelector("#current-location");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
     