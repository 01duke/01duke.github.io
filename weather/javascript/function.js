'use strict';
console.log(`Function JavaScript is running`)
var $ = document.querySelector.bind(document);
var $$ = document.querySelector.bind(document);
/* *************************************
 *  Weather Site JavaScript Functions *
 ************************************* */
// Listen for the DOM to finish building
document.addEventListener("DOMContentLoaded", function () {
  //get modified date function 
  buildModDate();
  //get WindChill
  let speed = 25;
  let temp = 20;
  let feelTemp = document.getElementById("real-feel");
  console.log(feelTemp)
  feelTemp.innerHTML =  buildWC(speed, temp);
  //ball
  let hour = "2";
  console.log(hour);
  timeBall(hour);
});
// Build the last modified date
function buildModDate() {
  const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastMod = new Date(document.lastModified);
  const dayName = dayArray[lastMod.getDay()];
  const monthName = monthArray[lastMod.getMonth()];
  const formattedDate = dayName + ", " + lastMod.getDate() + " " + monthName + ", " + lastMod.getFullYear();
  document.querySelector('#modDate').innerText = formattedDate;
  getElementById(formattedDate);
}
/* *************************************
 *  small Menu                        *
 ************************************* */
function toggleMenu() {
  document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}
/* *************************************
 *  Compute Wind Chill                 *
 ************************************* */
function buildWC(speed, temp) {
  // let feelTemp = document.getElementById("real-feel");
  // compute
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
  console.log(wc);
  // round wc
  wc = Math.floor(wc);
  // return larger
  wc = (wc > temp) ? temp : wc;
  // console and return the windchill
  console.log(wc);
  return wc
}
/* *************************************
 *  ball movement                      *
 ************************************* */

// Time Indicator Function
function timeBall(hour){
  // Find all "ball" classes and remove them
  let x = document.querySelectorAll(".ball");
  for (let item of x) {
      console.log(item);
      item.classList.remove("ball");
  }
  
  // Find all hours that match the parameter and add the "ball" class
  let hr = document.querySelectorAll(".i"+hour);
  for (let item of hr){
      item.classList.add("ball");
  }
}
/* *************************************
 *  fetch JSON Weather                       *
 ************************************* */
// let locName = p.properties.relative.properties.city;
// let stateName = p.properties.relative.properties.state;
// let fullName = locName + ", " + stateName
// let weatherURL = /weather/javascript/idahoweather.json;
// function fetchWeatherData(weatherURL){

// }