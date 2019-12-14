"use strict";
console.log("javascript");

var fullDay = new Date(); {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";


    var m = month[fullDay.getMonth()];
    var n = weekday[fullDay.getDay()];
    var todayDate = document.getElementById("todaysDate");

    todayDate.innerHTML = n + ", " + fullDay.getDate() + " " + m + " " + fullDay.getFullYear();
}

function toggleMenu() {
    document.getElementById("navigation").classList.toggle("hide");
}
var pageNav = document.querySelector("#page-nav");
var storage = window.sessionStorage;

function storeRes() {
    storage.setItem("Temple: ", document.querySelector("#temples").value);
    storage.setItem("Check in Date: ", document.querySelector("#in-date").value);
    storage.setItem("Check out Date: ", document.querySelector("#out-date").value);
    storage.setItem("Room Style: ", document.querySelector("#room").value);
    storage.setItem("Number of Rooms: ", document.querySelector("#numberOfRooms").value);
    storage.setItem("firstName", document.querySelector("#firstName").value);
    storage.setItem("lastName: ", document.querySelector("#lastName").value);
    storage.setItem("Phone Number: ", document.querySelector("#phone").value);
    storage.setItem("email: ", document.querySelector("#email").value);
    storage.setItem("City: ", document.querySelector("#city").value);
    storage.setItem("State: ", document.querySelector("#state").value);
    storage.setItem("Country: ", document.querySelector("#country").value);

}

function display() {
    document.querySelector("#name").innerHTML = "Name: " + storage.getItem("firstName") + " " + storage.getItem("lastName: ");
    document.querySelector("#temple").innerHTML = "Chosen Temple: " + storage.getItem("Temple: ");
    document.querySelector("#dayin").innerHTML = "Arriving: " + storage.getItem("Check in Date: ")
    document.querySelector("#dayout").innerHTML = "Departing: " + storage.getItem("Check out Date: ")
    document.querySelector("#roomStyle").innerHTML = "Type of Room: " + storage.getItem("Room Style: ");
    document.querySelector("#numberOfRooms").innerHTML = "Number of Rooms: " + storage.getItem("Number of Rooms: ");

}

function storeContact() {
    storage.setItem("firstNameContact: ", document.querySelector("#firstCon").value);
    storage.setItem("lastNameContact: ", document.querySelector("#lastCon").value);
    storage.setItem("emailContact: ", document.querySelector("#emailCon").value);
    storage.setItem("phoneNumberContact: ", document.querySelector("#phoneNumberCon").value);
    storage.setItem("message: ", document.querySelector("#messageCon").value);

}