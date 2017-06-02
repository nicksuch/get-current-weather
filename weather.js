var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var cityOutput = document.getElementById('cityOutput');
var temperatureOutput = document.getElementById('temperatureOutput');
var conditionOutput = document.getElementById('conditionOutput');
var weatherImage = document.getElementById('weatherImage');
var apiRequest;

weatherButton.onclick = getWeather;

//Summary: Calls other functions when button is pressed
//Inputs: None, Outputs: None
function getWeather() {
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=ef6a94dab254dc386b931af4d5ca58c7";
  url = url.replace("<zipCode>",zipInput.value );
  console.log(url);
  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();
}

//Summary: Show error message if nessasary
//Inputs: None, Outputs: None
function httpRequestOnError() {
  alert("Request Error: Try using Http instead of Https. Ex: https://codepen.io");
}

//Summary: Catches the response and determines status
//Inputs: None, Outputs: None
function catchResponse() {
  console.log(apiRequest.statusText);
  if (apiRequest.statusText == "OK") {
    parseResponse(JSON.parse(this.responseText));
  } else {
    alert("Request Error: " + apiRequest.statusText);
  }
}

//Summary: Parses JSON object.
//Inputs: JSON Object, Outputs: None
function parseResponse(results) {
  console.log(results);
  var city = results.name;
  var tempK = results.main.temp;
  var tempF = kelvinToFahrenheit(tempK);
  var tempC = kelvinToCelsius(tempK);
  var conditions = results.weather[0].description;
  displayWeather(city, tempK, tempF, tempC, conditions); //Calls display func
  displayImage(tempF); 
  console.log(tempC);
}

//Summary:
//Inputs: Kelvin, Outputs: Fahr 
function kelvinToFahrenheit(tempK) {
  //T(°F) = 300K × 9/5 - 459.67	= 80.33 °F
  var tempF = tempK * (9 / 5) - 459.67;
  return Math.round(tempF);
}

//Summary:
//Inputs: , Outputs: 
function kelvinToCelsius(tempK) {
//T(°C) = 300K - 273.15 = 26.85 °C
  var tempC = tempK - 273.15;
  return Math.round(tempC);
}

//Summary:
//Inputs: , Outputs: 
function displayWeather(city, tempK, tempF, tempC, conditions) {
cityOutput.innerHTML = city;
  temperatureOutputK.innerHTML = tempK + 'K';
  temperatureOutputF.innerHTML = tempF + 'ºF';
  temperatureOutputC.innerHTML = tempC + 'ºC';
   conditionOutput.innerHTML = conditions;
}

//Summary:
//Inputs: , Outputs: 
//Cold: "https://bit.ly/2mqimfZ", Warm: "https://bit.ly/2mqbYWe", Hot: "https://bit.ly/2mLNXtv"
function displayImage(tempF) {
  if (tempF > 75) {
    weatherImage.src = "https://bit.ly/2mLNXtv";
  } else if (tempF > 50) {
    weatherImage.src = "https://bit.ly/2mqbYWe";
  } else {
    weatherImage.src = "https://bit.ly/2mqimfZ";
  }
}