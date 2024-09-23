// Define a function to display the current time
function displayTime() {
    let clock = document.querySelector("#clock"); // Get the element with id="clock"
    let now = new Date(); // Get the current time
    clock.textContent = now.toLocaleTimeString(); // Display time in the clock
}
displayTime(); // Display time right away
setInterval(displayTime, 1000); // And the update it every second