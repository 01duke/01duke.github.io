'use strict';
console.log('My javascript is being read.');

var pageNav = document.querySelector('#page-nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-content');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;

document.addEventListener("DOMContentLoaded", function () {
    buildModDate();

    //variables for 3 DOM structures

    // variables for wind chill function
    //let temp = 31;
    //let speed = 20;
    //buildWC(speed, temp);
    // let weather = "rain";
    // console.log(weather);//checks to see if it reads the function

    // The time indictor function
    //let hour="9";
    //console.log(hour);
    //timeBall(hour);

    // Changes the backgorund image
    // changeSummaryImage(weather);

    //Get weather json data
    let weatherURL = "/weather/javascript/idahoweather.json";
    fetchWeatherData(weatherURL);
});


// Handles small screen menu
function toggleMenu() {
    document.getElementById("navigation").classList.toggle("hide");
}


// Build the last modified date

function buildModDate() {
    var fullDay = new Date();

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
    console.log(`The name of the day is: ${n}`);
    var todayDate = document.getElementById("todaysDate");

    todayDate.innerHTML = n + ", " + fullDay.getDate() + " " + m + " " + fullDay.getFullYear();
}
// function buildModDate(){
//  const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//  let lastMod = new Date(document.lastModified);
//  const dayName = dayArray[lastMod.getDay()];
//  const monthName = monthArray[lastMod.getMonth()];
//  const formattedDate = dayName+", "+lastMod.getDate() +" "+monthName+", "+lastMod.getFullYear();
//  document.querySelector('#modDate').innerText = formattedDate;
// }

// ************* wind chill **************************
function buildWC(speed, temp) {
    let feelTemp = document.getElementById('feels');
    let highTemp = document.getElementById('high');
    let lowTemp = document.getElementById('low');
    let currentTemp = document.getElementById('current');;
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);

    wc = 'Feels like ' + wc + '&#176;' + 'F';
    let high = temp + 15;
    let low = temp - 12;
    feelTemp.innerHTML = wc;
    lowTemp.innerHTML = low + '&#176;' + 'F' ;
    currentTemp.innerHTML = temp + '&#176;' + 'F';

}


function timeBall(hour) {
    // Find all "ball" classes and remove them
    let x = document.querySelectorAll(".ball");
    for (let item of x) {
        item.classList.remove("ball");
    }

    // Find all hours that match the parameter and add the "ball" class
    let hr = document.querySelectorAll(".i" + hour);
    for (let item of hr) {
        item.classList.add("ball");
    }

}

// Changes the background image
function changeSummaryImage(weather) {
    // gets the weather-section Id
    let x = document.getElementById('weather-section');

    weather = weather.toLowerCase();

    // adds the class name to change the backgorund image
    console.log(weather);
    switch (weather) {
        case "clear":
            x.className += 'clear';
            break;
        case "rain":
            x.className += 'rain';
            break;
        case "fog":
            x.className += 'fog';
            break;
        case "snow":
            x.className += 'snow';
            break;
        case "clouds":
            x.className += 'clouds';
            break;
    }
}

/* *************************************
*  Fetch Weather Data
************************************* */
function fetchWeatherData(weatherURL) {
    let cityName = contentHeading.dataset.page; // The data we want from the weather.json file
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);
            // data is the full JavaScript object, but we only want the preston part
            // shorten the variable and focus only on the data we want to reduce typing
            let p = data[cityName];

            // **********  Get the location information  **********
            let locName = p.properties.relativeLocation.properties.city;
            let locState = p.properties.relativeLocation.properties.state;
            // Put them together
            let fullName = locName + ', ' + locState;
            // See if it worked, using ticks around the content in the log
            console.log(`fullName is: ${fullName}`);
            // Get the longitude and latitude and combine them to
            // a comma separated single string
            const latLong = p.properties.relativeLocation.geometry.coordinates[1] + "," + p.properties.relativeLocation.geometry.coordinates[0];
            console.log(latLong);

            // Create a JSON object containing the full name, latitude and longitude
            // and store it into local storage.


            // **********  Get the current conditions information  **********
            // As the data is extracted from the JSON, store it into session storage
            // Get the temperature data
            sessStore.setItem("fullName", fullName);
            sessStore.setItem("latLong", latLong);
            const prestonData = JSON.stringify({ fullName, latLong });

            const temp = p.properties.relativeLocation.properties.temperature;
            sessStore.setItem("temperature", temp);

            const highTemp = p.properties.relativeLocation.properties.highTemp;
            sessStore.setItem("highTemp", highTemp);

            const lowTemp = p.properties.relativeLocation.properties.lowTemp;
            sessStore.setItem("lowTemp", lowTemp);

            // Get the wind data 
            const windSpeed = p.properties.relativeLocation.properties.windSpeed;
            sessStore.setItem("WindSpeed", windSpeed);

            const windGusts = p.properties.relativeLocation.properties.windGust;
            sessStore.setItem("WindGusts", windGusts);

            // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into session storage.
            getHourly(p.properties.forecastHourly);


        })
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
}

/* *************************************
*  Get Hourly Forecast data
************************************* */
function getHourly(URL) {
    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('Data from getHourly function:');
            console.log(data); // Let's see what we got back

            // Store 12 hours of data to session storage  
            var hourData = [];
            let todayDate = new Date();
            var nowHour = todayDate.getHours();
            console.log(`nowHour is ${nowHour}`);
            for (let i = 0, x = 11; i <= x; i++) {
                if (nowHour < 24) {
                    hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
                    sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
                    nowHour++;
                } else {
                    nowHour = nowHour - 12;
                    hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
                    sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
                    nowHour = 1;
                }
            }

            // Get the shortForecast value from the first hour (the current hour)
            // This will be the condition keyword for setting the background image
            sessStore.setItem('shortForecast', data.properties.periods[0].shortForecast);

            // Call the buildPage function
            buildPage();
        })
        .catch(error => console.log('There was a getHourly error: ', error))
}
/* *************************************
* get Short Forecast data
************************************* */
function getShortForecast(shortForecast) {

    console.log(shortForecast);

    if (shortForecast.includes("Sun") || shortForecast.includes("Clear")) {
        shortForecast = "clear";
    }
    else if (shortForecast.includes("Cloud")) {
        shortForecast = "clouds";
    }
    else if (shortForecast.includes("Sleet") || shortForecast.includes("Snow")) {
        shortForecast = "snow";
    }
    else if (shortForecast.includes("Showers") || shortForecast.includes("Thunder") || shortForecast.includes("Rain")) {
        shortForecast = "rain";
    }
    else {
        shortForecast = "fog";
    }
    return shortForecast;
}



/* ************************************
*  Build the Weather page
************************************* */
function buildPage() {
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.querySelector('#page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(sessStore.getItem('fullName'));
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Preston, Idaho | The Weather Site

    // Get the h1 to display the city location
    let contentHeading = document.querySelector('#contentHeading');
    contentHeading.innerHTML = sessStore.getItem('fullName');
    // The h1 in the main element should now say "Preston, Idaho"

    // Get the coordinates container for the location
    let latlon = document.querySelector('#latLon');
    latLon.innerHTML = sessStore.getItem('latLong');
    // The latitude and longitude should match what was stored in session storage.

    // Get the condition keyword and set Background picture
    changeSummaryImage(sessStore.getItem('shortForecast'));
    /* Keep in mind that the value may be different than 
    what you need for your CSS to replace the image. You 
    may need to make some adaptations for it to work.*/

    // **********  Set the current conditions information  **********
    // Set the temperature information
    let higTemp = document.querySelector('#high');
    let loTemp = document.querySelector('#low');
    let currentTemp = document.querySelector('#current');
    //let feelTemp = document.querySelector('#feels');

    higTemp.innerHTML = sessStore.getItem('highTemp') + "°F";
    loTemp.innerHTML = sessStore.getItem('lowTemp') + "°F";
    currentTemp.innerHTML = sessStore.getItem('temperature') + "°F"
    // Set the wind information
    let speed = document.querySelector('#wind');
    let gust = document.querySelector('#gusts');
    speed.innerHTML = sessStore.getItem('WindSpeed') + " mph";
    gust.innerHTML = sessStore.getItem('WindGusts') + " mph";
    // Calculate feel like temp
    console.log(sessStore.getItem('WindSpeed'));
    console.log(sessStore.getItem('WindGusts'));
    console.log(sessStore.getItem('temperature'));
    //feelTemp.innerHTML = 
    buildWC(sessStore.getItem('WindSpeed'), sessStore.getItem('temperature'));

    // **********  Set the Time Indicators  **********
    let thisDate = new Date();
    var currentHour = thisDate.getHours();
    let indicatorHour;
    // If hour is greater than 12, subtract 12
    if (currentHour > 12) {
        indicatorHour = currentHour - 12;
    } else {
        indicatorHour = currentHour;
    };
    console.log(`Current hour in time indicator is: ${currentHour}`);
    // Set the time indicator
    timeBall(indicatorHour);

    // ********** Hourly Temperature Component  **********
    // Get the hourly data from storage as an array
    let currentData = [];
    let tempHour = currentHour;
    // Adjust counter based on current time
    for (let i = 0, x = 12; i < x; i++) {
        if (tempHour <= 23) {
            currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
            tempHour++;
        } else {
            tempHour = tempHour - 12;
            currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
            console.log(`CurrentData[i][0] is: ${currentData[i][0]}`);
            tempHour = 1;
        }
    }
    console.log(currentData);

    // Loop through array inserting data
    // Start with the outer container that matchs the current time
    tempHour = currentHour + 1;
    for (let i = 0, x = 12; i < x; i++) {
        if (tempHour >= 13) {
            tempHour = tempHour - 12;
        }
        console.log(`Start container is: #temps o.${tempHour}`);
        document.querySelector('#to' + tempHour).innerHTML = currentData[i][0];    //QUESTION, WHAT DOES THE MONEY SIGN MEAN? IS IT DOCUMENT.QUERYSELECTOR????????
        tempHour++;
    }

    console.log(currentHour);
    // ********** Hourly Wind Component  **********
    // Get the hourly data from storage
    let windArray = [];
    let windHour = currentHour + 1;
    console.log(windHour);
    // Adjust counter based on current time
    for (let i = 0, x = 12; i < x; i++) {
        if (windHour <= 23) {
            windArray[i] = currentData[i][1].split(" ");
            console.log(`windArray[i] is: ${windArray[i]}`);
            windHour++;
        } else {
            windHour = windHour - 12;
            windArray[i] = currentData[i][1].split(" ");
            windHour = 1;
        }
    }
    console.log(windArray);

    // Insert Wind data
    // Start with the outer container that matchs the time indicator
    windHour = currentHour + 1;
    for (let i = 0, x = 12; i < x; i++) {
        if (windHour >= 13) {
            windHour = windHour - 12;
        }
        document.querySelector('#o' + windHour).innerHTML = windArray[i][0];
        windHour++;
    }


    // **********  Condition Component Icons  **********
    let conditionHour = currentHour + 1;
    // Adjust counter based on current time
    for (let i = 0, x = 12; i < x; i++) {
        if (conditionHour >= 13) {
            conditionHour = conditionHour - 12;
        }
        document.querySelector('#co' + conditionHour).innerHTML = '<img src="' + currentData[i][2] + '" alt="hourly weather condition image">';
        conditionHour++;
    }
    //gets short forcast name to pass to changeSummaryImage
    let shortForecast = sessStore.getItem('shortForecast');
    let weather = getShortForecast(shortForecast);
    changeSummaryImage(weather);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class from main
    statusContainer.setAttribute('class', 'hide'); // hides the status container
}
