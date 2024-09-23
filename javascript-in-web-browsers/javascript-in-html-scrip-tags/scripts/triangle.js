let canvas = document.querySelector("#triangle");
let c = canvas.getContext('2d');
c.fillStyle = "grey"
c.beginPath(); // Start a new path
c.moveTo(100, 100); // Begin a subpath at (100,100)
c.lineTo(200, 200); // Add a line from (100,100) to (200,200)
c.lineTo(100, 200); // Add a line from (200,200) to (100,200)
c.closePath() // Close the triangle
c.strokeStyle = "black";
c.lineWidth = 5
c.stroke(); // Stroke two sides of the triangle
c.fill(); // Fill a triangular area
