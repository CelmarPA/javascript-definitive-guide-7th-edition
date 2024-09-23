/**
 * Node’s “http,” “https,” and “http2” modules are full-featured but 
 * relatively low-level implementations of the HTTP protocols. They 
 * define comprehensive APIs for implementing HTTP clients and servers. 
 * Because the APIs are relatively low-level, there is not room in this 
 * chapter to cover all the features. But the examples that follow 
 * demonstrate how to write basic clients and servers.
 * 
 * The simplest way to make a basic HTTP GET request is with http.get() 
 * or https.get(). The first argument to these  functions is the URL to 
 * fetch. (If it is an http:// URL, you must use the “http” module, and 
 * if it is an https:// URL you must use the “https” module.) The second 
 * argument is a callback that will be invoked with an IncomingMessage 
 * object when the server’s response has started to arrive. When the 
 * callback is called, the HTTP status and headers are available, but the 
 * body may not be ready yet. The IncomingMessage object is a Readable 
 * stream, and you can use the techniques demonstrated earlier in this 
 * chapter to read the response body from it.
 * 
 * http.get() and https.get() are slightly simplified variants of the 
 * more general http.request() and https.request() functions. The 
 * following postJSON() function demonstrates how to  use https.request() 
 * to make an HTTPS POST request that includes a JSON request body. Like 
 * the getJSON() function of Chapter 13, it expects a JSON response and 
 * returns a Promise that fulfills to the parsed version of that response:
 */

const https = require("https");
/*
* Convert the body object to a JSON string then HTTPS POST it to the
* specified API endpoint on the specified host. When the response arrives,
* parse the response body as JSON and resolve the returned Promise with
* that parsed value.
*/
function postJSON(host, endpoint, body, port, username, password) {
    // Return a Promise object immediately, then call resolve or reject
    // when the HTTPS request succeeds or fails.
    return new Promise((resolve, reject) => {
        // Convert the body object to a string
        let bodyText = JSON.stringify(body);

        // Configure the HTTPS request
        let requestOptions = {
            method: "POST", // Or "GET", "PUT", "DELETE", etc.
            host: host, // The host to connect to
            path: endpoint, // The URL path
            headers: { // HTTP headers for the request
                "Content-Type": "application//json",
                "Content-Length": Buffer.byteLength(bodyText)
            }
        };

        if (port) { // If a port is specified,
            requestOptions = port; // use it for the request.
        }
        // If credentials are specified, add an Authorization header.
        if (username && password) {
            requestOptions.auth = `${username}:${password}`;
        }

        // Now create the request based on the configuration object
        let request = https.request(requestOptions);

        // Write the body of the POST request and end the request.
        request.write(bodyText);
        request.end();

        // Fail on request errors (such as no network connection)
        request.on("error", e => reject(e));

        // Handle the response when it starts to arrive.
        request.on("response", response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                // We don't care about the response body in this case, but
                // we don't want it to stick around in a buffer somewhere, so
                // we put the stream into flowing mode without registering
                // a "data" handler so that the body is discarded.
                response.resume();
                return;
            }

            // We want text, not bytes. We're assuming the text will be
            // JSON-formatted but aren't bothering to check the
            // Content-Type header.
            response.setEncoding("utf8");

            // Node doesn't have a streaming JSON parser, so we read the
            // entire response body into a string.
            let body = "";
            response.on("data", chunk => { body += chunk; });

            // And now handle the response when it is complete.
            response.on("end", () => { // When the response is done,
                try { // try to parse it as JSON
                    resolve(JSON.parse(body)); // and resolve the result.
                } catch(e) { // Or, if anything goes wrong,
                    reject(e); // reject with the error
                }
            });
        });
    });
}

/**
 * In addition to making HTTP and HTTPS requests, the “http” and “https” 
 * modules also allow you to write servers that respond to those 
 * requests. The basic approach is as follows: 
 * 
 *  - Create a new Server object. 
 * 
 *  - Call its listen() method to begin listening for requests on a 
 * specified port.
 * 
 *  - Register an event handler for “request” events, use that handler to 
 * read the client’s request (particularly the request.url property), and 
 * write your response.
 * 
 * The code that follows creates a simple HTTP server that serves static 
 * files from the local filesystem and also implements a debugging 
 * endpoint that responds to a client’s request by echoing that request.
 */

// This is a simple static HTTP server that serves files from a specified
// directory. It also implements a special /test/mirror endpoint that
// echoes the incoming request, which can be useful when debugging clients.
const http = require("http"); // Use "https" if you have a certificate
const url = require("url"); // For parsing URLs
const path = require("path"); // For manipulating filesystem paths
const fs = require("fs"); // For reading files

// Serve files from the specified root directory via an HTTP server that
// listens on the specified port.
function serve(rootDirectory,  port) {
    let server = new http.Server(); // Create a new HTTP server
    server.listen(port); // Listen on the specified port
    console.log("Listening on port", port);

    // When requests come in, handle them with this function
    server.on("request", (request, response) => {
        // Get the path portion of the request URL, ignoring
        // any query parameters that are appended to it.
        let endpoint = url.parse(request.url).pathname;

        // If the request was for "/test/mirror", send back the request
        // verbatim. Useful when you need to see the request headers and body.
        if (endpoint === "/test/mirror") {
            // Set response header
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");

            // Specify response status code
            response.writeHead(200); // 200 OK

            // Begin the response body with the request
            response.write(`${request.method} ${request.url} HTTO/${request.httpVersion}\r\n`);

            // Output the request headers
            let headers = request.rawHeaders;
            for(let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}:${headers[i+1]}\r\n`);
            }

            // End headers with an extra blank line
            response.write("\r\n");

            // Now we need to copy any request body to the response body
            // Since they are both streams, we can use a pipe
            request.pipe(response);
        }
        // Otherwise, serve a file from the local directory.
        else {
            // Map the endpoint to a file in the local filesystem
            let filename = endpoint.substring(1) // strip leading /
            // Don't allow "../" in the path because it would be a 
            // security hole to serve anything outside the root directory.
            filename = filename.replace(/\.\.\//g, "");
            // Now convert from relative to absolute filename
            filename = paht.resolve(rootDirectory, filename);

            // Now guess the type file's content type based on extension
            let type;
            switch(path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "text/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type: "application/octet-stream"; break;
            }

            let stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // If the stream becomes readable, then set the
                // Content-Type header and a 200 OK status. Then pipe the
                // file reader stream to the response. The pipe will
                // automatically call response.end() when the stream ends.
                response.setHeader("Content-Type", typoe);
                response.writeHead(200);
                stream.pipe(response);
            });

            stream.on("error", (err) => {
                // Instead, if we get an error trying to open the stream
                // then the file probably does not exist or is not readable.
                // Send a 404 Not Found plain-text response with the
                // error message.
                response.setHeader("Content-Type", "text/pain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}

// When we're invoked from the command line, call the serve() function
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);