/**
 * The Node.js server-side JavaScript environment is deeply asynchronous 
 * and defines many APIs that use callbacks and events. The default API 
 * for reading the contents of a file, for example, is asynchronous and 
 * invokes a callback function when the contents of the file have been 
 * read:
 */

const fs = require("fs"); // The "fs" module has filesystem related APIs
let options = { // An object to hold options for our program
    // default options would go here
};

// Read a configuration file, then call the callback function
fs.readFile("config.json", "utf-8", (err, text) => {
    if (err) {
        // If there was an error, display a warning, but continue
        console.warn("Could not read config file:", err);
    } else {
        // Otherwise,parse the file contents and assign to the options object
        Object.assign(options, JSON.parse(text));
    }

    // In either case,we now start running the program
    startProgram(options);
});

/**
 * Node’s fs.readFile() function takes a two-parameter callback as its 
 * last argument. It reads the specified file asynchronously and then 
 * invokes the callback. If the file was read successfully, it passes the 
 * file contents as the second callback argument. If there was an error, 
 * it passes the error as the first callback argument. In this example, 
 * we  express the callback as an arrow function, which is a succinct and 
 * natural syntax for this kind of simple operation.
 */

/**
 * Node also defines a number of event-based APIs. The following function 
 * shows how to make an HTTP request for the contents of a URL in Node. 
 * It has two layers of asynchronous code handled with event listeners. 
 * Notice that Node uses an on() method to register event listeners 
 * instead of addEventListener():
 */

const https = require("https");

// Read the text content of the URL and asynchronously pass it to the callback.
function getText(url, callback)  {
    // Start an HTTp GET request  for the URL
    request = https.get(utl);

    // Register a function to handle the "response" event.
    request.on("response", response => {
        // The response event means that response headers have benn received
        let httpStatus = response.statusCode;

        // The body of the HTTP response has not been received yet.
        // So we register more event handlers to to be called whe itarrives.
        response.setEnconding("utf-8"); // We're expecting Unicode text
        let body = ""; // wich we will accumulate  here.

        // This event handler is called when a chunk of the body is ready
        response.on("data", chunk => { body += chunk; });

        // This event handler is called whe the responde is complete
        response.on("end", () => { 
            if (httpStatus === 200) { // If the HTTP response was good
                callback(null, body); // Pass response body ro the callback
            } else { // Otherwise pass an error
                callback(httpStatus, null);
            }
        });
    });

    // We also register an event handler for lower-level network erros
    request.on("error", (err) => {
        callback(err, null);
    });
}