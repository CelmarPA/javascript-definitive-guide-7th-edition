let canvas = document.querySelector("#square"); // Get the first canvas element
let context = canvas.getContext("2d"); // Get 2d drawing context
context.fillStyle = "#f00"; // Set fill color to red
context.fillRect(0,0,10,10); // Fill a square

canvas = document.querySelector("#circle"); // Second canvas element
context = canvas.getContext("2d"); // Get its context
context.beginPath(); // Begin a new "path"
context.arc(5, 5, 5, 0, 2*Math.PI, true); // Add a circle to the path
context.fillStyle = "#00f"; // Set blue fill color
context.fill(); // Fill the path