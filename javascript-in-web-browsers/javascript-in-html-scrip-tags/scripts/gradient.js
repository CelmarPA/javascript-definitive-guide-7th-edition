// Get the canvas context
let canvas = document.querySelector("#gradient"); 
let c = canvas.getContext("2d");

// A linear gradient, diagonally across the canvas (assuming no transforms)
let bgfade = c.createLinearGradient(0, 0, canvas.width, canvas.height);
bgfade.addColorStop(0.0, "#88f"); // Start with light blue in upper left
bgfade.addColorStop(1.0, "#fff"); // Fade top white in lower right

// A gradient between two concentric circles. Transparent in the middle
// fading to translucent gray and then back to transparent.
let donut = c.createRadialGradient(300,300,100, 300,300,300);
donut.addColorStop(0.0, "transparent"); // Transparent
donut.addColorStop(0.7, "rgba(100,100,100,0.9)"); // Translucent gray
donut.addColorStop(1.0, "rgba(0,0,0,0)"); // Transparent again

// Draw the rectangle with linear gradient
c.fillStyle = bgfade;
c.fillRect(0, 0, canvas.width, canvas.height);

// Drae a circle wiht radial gradient
c.beginPath();
c.arc(300, 300, 200, 0, Math.PI * 2);
c.fillStyle = donut;
c.fill();