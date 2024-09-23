/**
 * The <canvas> element has no appearance of its own but creates a 
 * drawing surface within the document and exposes a powerful drawing API 
 * to client-side JavaScript. The main difference between the <canvas> 
 * API and SVG is that with the canvas you create drawings by calling 
 * methods, and with SVG you create drawings by building a tree of XML 
 * elements. These two approaches are equivalently powerful: either one 
 * can be simulated with the other. On the surface, they are quite 
 * different, however, and each has its strengths and weaknesses. An SVG 
 * drawing, for example, is easily edited by removing elements from its 
 * description. To remove an element from the same graphic in a <canvas>, 
 * it is often necessary to erase the drawing and redraw it from scratch.
 * 
 * Most of the Canvas drawing API is defined not on the <canvas> element 
 * itself, but instead on a “drawing context” object obtained with the 
 * getContext() method of the canvas. Call getContext() with the argument 
 * “2d” to obtain a CanvasRenderingContext2D object that you can use to 
 * draw two-dimensional graphics into the canvas.
 * 
 * As a simple example of the Canvas API, the following HTML document uses <canvas> elements and some JavaScript to display two simple shapes:
 * 
 * red-blue-shapes.html
 * 
 * We’ve seen that SVG describes complex shapes as a “path” of lines and 
 * curves that can be drawn or filled. The Canvas API also uses the 
 * notion of a path. Instead of describing a path as a string of letters 
 * and numbers, a path is defined by a series of method calls, such as 
 * the beginPath() and arc() invocations in the preceding code. Once a 
 * path is defined, other methods, such as fill(), operate on that path. 
 * Various properties of the context object, such as fillStyle, specify 
 * how these operations are performed.
 * 
 * The subsections that follow demonstrate the methods and properties of 
 * the 2D Canvas API. Much of the example code that follows operates  on 
 * a variable c. This variable holds the CanvasRenderingContext2D object 
 * of the canvas, but the code to initialize that variable is sometimes 
 * not shown. In order to make these examples run, you would need to add 
 * HTML markup to define a canvas with appropriate width and height 
 * attributes, and then add code like this to initialize the variable c:
 */

let canvas = document.querySelector("#my_canvas_id");
let c = canvas.getContext('2d');

// Paths and Polygons

/**
 * To draw lines on a canvas and to fill the areas enclosed by those 
 * lines, you begin by defining a path. A path is a sequence of one or 
 * more subpaths. A subpath is a sequence of two or more points connected 
 * by line segments (or, as we’ll see later, by curve segments). Begin a 
 * new path with the beginPath() method. Begin a new subpath with the 
 * moveTo() method. Once you have established the starting point of a 
 * subpath with moveTo(), you can connect that point to a new point with 
 * a straight line by calling lineTo(). The following code defines a path 
 * that includes two line segments:
 */

c.beginPath(); // Start a new path
c.moveTo(100, 100); // Begin a subpath at (100,100)
c.lineTo(200, 200); // Add a line from (100,100) to (200,200)
c.lineTo(100, 200); // Add a line from (200,200) to (100,200)

/**
 * This code simply defines a path; it does not draw anything on the canvas. To draw (or “stroke”) the two line segments in the path, call the stroke() method, and to fill the area defined by those line segments, call fill():
 */

c.fill(); // Fill a triangular area
c.stroke(); // Stroke two sides of the triangle

/**
 * Notice that the subpath defined is “open.” It consists of just two 
 * line segments, and the end point is not connected back to the starting 
 * point. This means that it does not enclose a region. The fill() method 
 * fills open subpaths by acting as if a straight line connected the last 
 * point in the subpath to the first point in the subpath. That is why 
 * this code fills a triangle, but strokes only two sides of the triangle.
 * 
 * If you wanted to stroke all three sides of the triangle just shown, 
 * you would call the closePath() method to connect the end point of the 
 * subpath to the start point. (You could also call lineTo(100,100), but 
 * then you end up with three line segments that share a start and end 
 * point but are not truly closed. When drawing with wide lines, the 
 * visual results are better if you use closePath().)
 * 
 * There are two other important points to notice about stroke() and 
 * fill(). First, both methods operate on all subpaths in the current 
 * path. Suppose we had added another subpath in the preceding code: 
*/

c.moveTo(300,100); // Beging a new subpath at (300,100);
c.lineTo(300,200); // Draw a vertical line down to (300,200);

/**
 * If we then called stroke(), we would draw two connected edges of a 
 * triangle and a disconnected vertical line. 
 * 
 * The second point to note about stroke() and fill() is that neither one 
 * alters the current path: you can call fill() and the path will still 
 * be there when you call stroke(). When you are done with a path and 
 * want to begin another, you must remember to call beginPath(). If you 
 * don’t, you’ll end up adding new subpaths to the existing path,  and 
 * you may end up drawing those old subpaths over and over again.
 * 
 * The nest example defines a function for drawing regular polygons and 
 * demonstrates the use of moveTo(), lineTo(), and closePath() for 
 * defining subpaths and of fill() and stroke() for drawing those paths:
 * 
 * polygons.js
 * 
 * Notice that this example draws a hexagon with a square inside it. The 
 * square and the hexagon are separate subpaths, but they overlap. When 
 * this happens (or when a single subpath intersects itself), the canvas 
 * needs to be able to determine which regions are inside the path and 
 * which are outside. The canvas uses a test known as the “nonzero 
 * winding rule” to achieve this. In this case, the interior of the 
 * square is not filled because the square and the hexagon were drawn in 
 * the opposite directions: the vertices of the hexagon were connected 
 * with line segments moving clockwise around the circle. The vertices of 
 * the square were connected counterclockwise. Had the square been drawn 
 * clockwise as well, the call to fill() would have filled the interior 
 * of the square as well.
 */