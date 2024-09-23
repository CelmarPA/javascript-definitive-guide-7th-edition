 // Get the canvas element
 var canvas = document.getElementById("canvas");
 var c = canvas.getContext("2d");

// Define a regular polygon with n sides, centered at (x,y) with radius r.
// The vertices are equally spaced along the circumference of a circle.
// Put the first vertex straight up or at the specified angle.
// Rotate clockwise, unless the last argument is true.
function polygon(c, n, x, y, r, angle=0, counterclockwise=false) {
    c.moveTo(x + r * Math.sin(angle), // Begin a new subpath at the first vertex
             y - r * Math.cos(angle)); // Use trigonometry to compute position
    let delta = 2 * Math.PI / n; // Angular distance between vertices
    for(let i = 1; i < n; i++) { // For each of the remaining vertices
        angle  += counterclockwise?-delta:delta; // Adjust angle 
        c.lineTo(x + r * Math.sin(angle), // Add line to the next vertex
                 y - r * Math.cos(angle));
    }
    c.closePath(); // Connect last vertex back to the first
}

// Define some drawing attributes
c.font = "bold 60pt sans-serif"; // Big font
c.lineWidth = 2; // Narrow lines
c.strokeStyle = "#000"; // Black lines

// Outline a rectangle and some text
c.strokeRect(175, 25, 50, 325); // A vertical stripe down the middle
c.strokeText("<canvas>", 15, 330); // Note strokeText() instead of fillText()

// Define a complex path with an interior that is outside.
polygon(c, 3, 200, 225, 200); // Large Triangle
polygon(c, 3, 200, 225, 100, 0, true); // Smaller reverse triangle inside

// Make that path the clipping region.
c.clip(); 

// Stroke the path with a 5 pixel line, entirely inside the clipping region.
c.lineWidth = 10; // Half od this 10 pixel line will be clipped away
c.stroke();

// Fill the parts of the rectangle and text that are inside the clipping region
c.fillStyle = "#aaa"; // Light gray
c.fillRect(175, 25, 50, 325);  // Fill the vertical stripe
c.fillStyle = "#888"; // Darker gray
c.fillText("<canvas>", 15, 330)