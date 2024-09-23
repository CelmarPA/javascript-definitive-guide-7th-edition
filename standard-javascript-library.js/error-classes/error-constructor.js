/**
 * You should feel free to define your own Error subclasses that best 
 * encapsulate the error conditions of your own program. Note that you
 * are not limited to the name and message properties. If you create a
 * subclass, you can define new properties to provide error details. If 
 * you  are writing a parser, for example, you might find it useful to 
 * define a ParseError class with line and column properties that specify 
 * the exact location of the parsing failure. Or if you are working with 
 * HTTP requests, you might want to define an HTTPError class that has a
 * status property that holds the HTTP status code (such as 404 or 500)
 * of the failed request.
 */

// For example:

class HTTPError extends Error {
    constructor(status, statusText, url) {
        super(`${status} ${statusText}: ${url}`);
        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }

    get name() { return "HTTPError"; }
}

let error = new HTTPError(404, "Not Found", "http://example.com");
console.log(error.status); // => 404
console.log(error.message); // => "404 Not Found: http://example.com"
console.log(error.name); // => "HTTPError"