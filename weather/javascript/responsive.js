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