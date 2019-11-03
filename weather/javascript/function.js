"use strict";
console.log(`FUNCTION_JAVASCRIPT_IS_RUNNING`)

function toggleMenu() {
  document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

  function getDate() {
    var date = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayName = dayNames[date.getDay()];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = monthNames[date.getMonth()];
    document.getElementById("getDate").innerHTML = dayName + ", " + date.getDate() + " " + monthName + " " + date.getFullYear();
}

window.onload = getDate();
/* *************************************
*  Weather Site JavaScript Functions  *
************************************* */
// Listen for the DOM to finish building
document.addEventListener("DOMContentLoaded", function () {
  getDate();
  // variables for wind chill function
  let temp = 31;
  let wSpeed = 20;
  buildWC(wSpeed, temp);
  let weather = "clear";
  console.log(weather);
  // The time indictor function
  let hour = "6";
  console.log(hour);
  timeBall(hour);

  // Changes the backgorund image
  changeBackImage(weather);
})

var $ = document.querySelector.bind(document);
var $$ = document.querySelector.bind(document);
/* *************************************
 *  Computes the wind Chill Temp       *
 ************************************* */
function buildWC(wSpeed, temp) {
  let feelTemp = document.getElementById("real-feel");
  let highTemp = document.getElementById("hot");
  let lowTemp = document.getElementById("cold");
  let currentTemp = document.getElementById("current-temp");
  let windSpeed = document.getElementById("wind");
  let windGusts = document.getElementById("gusts");
  // Compute the windchill
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(wSpeed, 0.16) + 0.4275 * temp * Math.pow(wSpeed, 0.16);
  console.log(wc);
  // Round the answer down to integer
  wc = Math.floor(wc);

  // If chill is greater than temp, return the temp
  wc = (wc > temp) ? temp : wc;

  // Display windchill
  console.log(wc);

  let high = temp + 32;
  let low = temp - 25;
  feelTemp.innerHTML = wc;
  highTemp.innerHTML = high;
  lowTemp.innerHTML = low;
  currentTemp.innerHTML = temp;
  windSpeed.innerHTML = wSpeed;
  windGusts.innerHTML = "Gusts: " + (wSpeed + 5);

}


function timeBall(hour) {
  // Find.ball and remove them
  let x = document.querySelectorAll(".ball");
  for (let item of x) {
    console.log(item);
    item.classList.remove("ball");
  }

  // Find .ball class
  let hr = document.querySelectorAll(".i" + hour);
  for (let item of hr) {
    item.classList.add("ball");
  }

}

//background image
function changeBackImage(weather) {
  //section ID
  let x = document.getElementById("section");
  // convert lowercase
  weather = weather.toLowerCase();

  //class name to backgorund image
  console.log(weather);
  switch (weather) {
    case "clear":
      x.className += "clear";
      break;
    case "rain":
      x.className += "rain";
      break;
    case "fog":
      x.className += "fog";
      break;
    case "snow":
      x.className += "snow";
      break;
    case "clouds":
      x.className += "clouds";
      break;
  }

}