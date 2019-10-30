"use strict";

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
 *  Weather Site JavaScript Functions
 ************************************* */
/* *************************************
 *  Computes the wind Chill Temp
 ************************************* */
function builWC(speed, temp) {
    let feelTemp = document.getElementById("feeltemp");
    //compute wind chill as wc
    let wc = 35.74 + 0.6215 * temp -
        //     35.75 * Math.pow(speed, 0.16) + 0.4275 * temp Math.pow(speed, 0.16);
        console.log(wc)
    //rounding wc
    wc = Math.floor(wc)
    //if wc is greater than temp return temp
    wc = (wc > temp) ? temp : wc;
    console.log(wc);
    feelTemp.innerHTML = wc
}

var $ = document.querySelector.bind(document);
var $$ = document.querySelector.bind(document);

// function (hour) {
//     let x = $$(.ball)
// }