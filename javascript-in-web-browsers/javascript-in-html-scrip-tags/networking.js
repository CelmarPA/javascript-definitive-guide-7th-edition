// fetch()
/**
 * For basic HTTP requests, using fetch() is a three-step process:
 * 
 * 1 - Call fetch(), passing the URL whose content you want to retrieve.
 * 
 * 2 - Get the response object that is asynchronously returned by step 1 
 * when the HTTP response begins to arrive and call a method of this 
 * response object to ask for the body of the response.
 * 
 * 3 - Get the body object that is asynchronously returned by step 2 and 
 * process it however you want.
 */

/**
 * The fetch() API is completely Promise-based, and there are two 
 * asynchronous steps here, so you typically expect two then() calls or 
 * two await expressions when using fetch().
 * 
 * Here’s what a fetch() request looks like if you are using then() and 
 * expect the server’s response to your request to be JSON-formatted:
 */

fetch("api/users/current") // Make an HTTP (or HTTPS) GET request
    .then(response => response.json()) // Parse its body as a JSON object
    .then(currentUser => { // Then process that parsed object
        displayUserInfo(currentUser);
    });

/**
 * Here’s a similar request made using the async and await keywords to an 
 * API that returns a plain string rather than a JSON object:
 */

async function isServiceReady() {
    let response = await fetch("api/service/status");
    let body = await Response.text();
    return body === "ready";
}

// HTTP STATUS CODES, RESPONSE HEADERS, AND NETWORK ERRORS
fetch("api/users/current") // Make an HTTP (or HTTPS) GET request.
    .then(response => { // When we get a response, first check it
        if (response.ok &&  // for a success code and the expected type.
            response.headers.get("Content-Type") === "application.json") {
                return response.json(); // Return a Promisse for the body.
        } else {
            throw new Error( // Or throw an error.
                `Unexpected response status ${response.status} or content type`
            );
        } 
    })
    .then(currentUser => { // When the response.json() Promises resolves
        displayUserInfo(currentUser); // do something with the parsed body.
    })
    .catch(error => { // Or if anything went wrong, just log the error.
        // If the user's browser is offline, fetch() itself will reject.
        // IF the server returns a bad response the we throw an error above.
        console.log("Error while fetching current user:", error);
    });

/**
 * The Promise returned by fetch() resolves to a Response object. The 
 * status property of this object is the HTTP status code, such as 200 
 * for successful requests or 404 for “Not Found” responses. (statusText 
 * gives the standard English text that goes along with the numeric 
 * status code.) Conveniently, the ok property of a Response is true if 
 * status is 200 or any code between 200 and 299 and is false for any 
 * other code.
 * 
 * fetch() resolves its Promise when the server’s response starts to 
 * arrive, as soon as the HTTP status and response headers are available, 
 * but typically before the full response body has arrived. Even though 
 * the body is not available yet, you can examine the headers in this 
 * second step of the fetch process. The headers property of a Response 
 * object is a Headers object. Use its has() method to test for the 
 * presence of a header, or use its get() method to get the value of a 
 * header. HTTP header names are case-insensitive, so you can pass 
 * lowercase or mixedcase header names to these functions.
 * 
 * The Headers object is also iterable if you ever need to do that:
 */

fetch(url).then(response => {
    for(let [name, value] of response.headers) {
        console.log(`${name}: ${value}`);
    }
});

/**
 * If a web server responds to your fetch() request, then the Promise 
 * that was returned will be fulfilled with a Response object, even if 
 * the server’s response was a 404 Not Found error or a 500 Internal 
 * Server Error. fetch() only rejects the Promise it returns if it cannot 
 * contact the web server at all. This can happen if the user’s computer 
 * is offline, the server is unresponsive, or the URL specifies a 
 * hostname that does not exist. Because these things can happen on any 
 * network request, it is always a good idea to include a .catch() clause 
 * any time you make a fetch() call.
 */

// SETTING REQUEST PARAMETERS

/**
 * Sometimes you want to pass extra parameters along with the URL when 
 * you make a request. This can be done by adding name/value pairs at the 
 * end of a URL after a ?. The URL and URLSearchParams classes make it 
 * easy to construct URLs in this form, and the fetch() function accepts 
 * URL objects as its first argument, so you can include request 
 * parameters in a fetch() request like this:
 */

async function search(term) {
    let url = new URL("/api/search");
    url.searchParams.set("q", term);
    let response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    let resultsArray = await response.json();
    return resultsArray;
}

// SETTING REQUEST HEADERS

/**
 * Sometimes you need to set headers in your fetch() requests. If you’re 
 * making web API requests that require credentials, for example, then 
 * you may need to include an Authorization header that contains those 
 * credentials. In order to do this, you can use the two-argument version 
 * of fetch(). As before, the first argument is a string or URL object 
 * that specifies the URL to fetch. The second argument is an object that 
 * can provide additional options, including request headers:
 */

let authHeaders = new Headers();
// Don't use Basic auth unless it is over an HTTPS connection.
authHeaders.set("Authorization",
                `Basic ${btoa(`${username}:${password}`)}`);
fetch("api/users/", { headers: authHeaders })
    .then(response => response.json()) // Error handling omitted...
    .then(userList => displayAllUsers(userList));

/**
 * There are a number of other options that can be specified in the 
 * second argument to fetch(), and we’ll see it again later. An 
 * alternative to passing two arguments to fetch() is to instead pass the 
 * same two arguments to the Request() constructor and then pass the 
 * resulting Request object to fetch():
 */

let request = new Request(url, { headers });
fetch(request).then(response => response.json());

// PARSING RESPONSE BODIES

/**
 * In the three-step fetch() process that we’ve demonstrated, the second 
 * step ends by calling the json() or text() methods of the Response 
 * object and returning the Promise object that those methods return. 
 * Then, the third step begins when that Promise resolves with the body 
 * of the response parsed as a JSON object or simply as a string of text. 
 * 
 * These are probably the two most common scenarios, but they are not the 
 * only ways to obtain the body of a web server’s response. In addition 
 * to json() and text(), the Response object also has these methods:
 * 
 * - arrayBuffer(): This method returns a Promise that resolves to an 
 * ArrayBuffer. This is useful when the response contains binary data. 
 * You can use the ArrayBuffer to create a typed array or a 
 * DataView object from which you can read the binary data.
 * 
 * - blob(): This method returns a Promise that resolves to a Blob 
 * object. Blobs are not covered in any detail in this book, but the name 
 * stands for “Binary Large Object,” and they are useful when you expect 
 * large amounts of binary data. If you ask for the body of the response 
 * as a Blob, the browser implementation may stream the response data to 
 * a temporary file and then return a Blob object that represents that 
 * temporary file. Blob objects, therefore, do not allow random access to 
 * the response body the way that an ArrayBuffer does. Once you have a 
 * Blob, you can create a URL that refers to it with 
 * URL.createObjectURL(), or you can use the event-based FileReader API 
 * to asynchronously obtain the content of the Blob as a string or an 
 * ArrayBuffer. At the time of this writing, some browsers also define 
 * Promise-based text() and arrayBuffer() methods that give a more direct 
 * route for obtaining the content of a Blob.
 * 
 * - formData(): This method returns a Promise that resolves to a 
 * FormData object. You should use this method if you expect the body of 
 * the Response to be encoded in “multipart/form-data” format. This 
 * format is common in POST requests made to a server, but uncommon in 
 * server responses, so this method is not frequently used.
 */

// STREAMING RESPONSE BODIES

/**
 * In addition to the five response methods that asynchronously return 
 * some form of the complete response body to you, there is also an 
 * option to stream the response body, which is useful if there is some 
 * kind of processing you can do on the chunks of the response body as 
 * they arrive over the network. But streaming the response is also 
 * useful if you want to display a progress bar so that the user can see 
 * the progress of the download.
 * 
 * The body property of a Response object is a ReadableStream object. If  
 * you have already called a response method like text() or json()  that 
 * reads, parses, and returns the body, then bodyUsed will be true  to 
 * indicate that the body stream has already been read. If bodyUsed is 
 * false, however, then the stream has not yet been read. In this case, 
 * you can call getReader() on response.body to obtain a stream reader 
 * object, then use the read() method of this reader object to 
 * asynchronously read chunks of text from the stream. The read() method 
 * returns a Promise that resolves to an object with done and value 
 * properties. done will be true if the entire body has been read or if 
 * the stream was closed. And value will either be the next chunk, as a 
 * Uint8Array, or undefined if there are no more chunks.
 * 
 * This streaming API is relatively straightforward if you use async and 
 * await but is surprisingly complex if you attempt to use it with raw 
 * Promises. The next example demonstrates the API by defining a  
 * streamBody() function. Suppose you wanted to download a large JSON 
 * file and report download progress to the user. You can’t do that with 
 * the json() method of the Response object, but you could do it with the 
 * streamBody() function, like this (assuming that an  updateProgress() 
 * function is defined to set the value attribute on an HTML <progress> 
 * element):
 */

fetch('big.json')
    .then(response => streamBody(response, updateProgress))
    .then(bodyText => JSON.parse(bodyText))
    .then(handleBigJSONObject);

// Streaming the response body from a fetch() request

/**
* An asynchronous function for streaming the body of a Response object
* obtained from a fetch() request. Pass the Response object as the first
* argument followed by two optional callbacks.
*
* If you specify a function as the second argument, that reportProgress
* callback will be called once for each chunk that is received. The first
* argument passed is the total number of bytes received so far. The second
* argument is a number between 0 and 1 specifying how complete the
* download is. If the Response object has no "Content-Length" header
* however, then this second argument will always be NaN.
*
* If you want to process the data in chunks as they arrive, specify a
* function as the third argument. The chunks will be passed, as Uint8Array
* objects, to this processChunk callback.
*
* streamBody() returns a Promise that resolves to a string. If a 
* processChunk callback was supplied then this string is the 
* concatenation of the values returned by that callback. Otherwise the 
* string is the concatenation of the chunk values converted to UTF-8 
* strings.
*/
async function streamBody(response, reportProgress, processChunk) {
    // How many bytes are we expecting, or NaN if no header
    let expectedBytes = parseInt(response.headers.get("Content-Length"));
    let bytesRead = 0; // How many bytes received so far
    let reader = response.body.getReader(); // Read bytes with this function
    let decoder = new TextDecoder("utf-8"); // For converting bytes to text
    let body = ""; // Text read so far

    while(true) { // Loop until we exit below
        let {done, value} = await reader.read(); // Read a chunk
        
        if (value) { // If we got a byte array:
            if (processChunk) { // Process the bytes if
                let processed = processChunk(value); // a callback was passed.
                if(processed) {
                    body += processed;
                }
            } else { // Otherwise, convert bytes to text
                body += decoder.decode(value, {stream: true});
            }

            if (reportProgress) { // If a progress callback was
                bytesRead += value.length; // passed, then call it
                reportProgress(bytesRead, bytesRead / expectedBytes);
            }        
        }
        if (done) { // If this is the last chunk
            break; // exit the loop
        }
    }

    return body; // Return the body text we accumulated
}

// SPECIFYING THE REQUEST METHOD AND REQUEST BODY

/**
 * In each of the fetch() examples shown so far, we have made an HTTP (or 
 * HTTPS) GET request. If you want to use a different request method 
 * (such as POST, PUT, or DELETE), simply use the twoargument version of 
 * fetch(), passing an Options object with a method parameter:
 */

fetch(url, { method: "POST" }).then(r => r.json()).then(handleResponse);

/**
 * POST and PUT requests typically have a request body containing data to 
 * be sent to the server. As long as the method property is not set to 
 * "GET" or "HEAD" (which do not support request bodies), you can specify 
 * a request body by setting the body property of the Options object:
 */

fetch(url, {
    method: "POST",
    body: "hello world"
})

/**
 * When you specify a request body, the browser automatically adds an 
 * appropriate “Content-Length” header to the request. When the body is a 
 * string, as in the preceding example, the browser defaults the 
 * “Content-Type” header to “text/plain;charset=UTF-8.” You may need to 
 * override this default if you specify a string body of some more 
 * specific type such as “text/html” or “application/json”:
 */

fetch(url, {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(requestBody)
})

/**
 * The body property of the fetch() options object does not have to be a 
 * string. If you have binary data in a typed array or a DataView object 
 * or an ArrayBuffer, you can set the body property to that value and 
 * specify an appropriate “Content-Type” header. If you have binary data 
 * in Blob form, you can simply set body to the Blob. Blobs have a type 
 * property that specifies their content type, and the value of this 
 * property is used as the default value of the “Content-Type” header.
 * 
 * With POST requests, is it somewhat common to pass a set of name/value 
 * parameters in the request body (instead of encoding them into the 
 * query portion of the URL). There are two ways to do this:
 * 
 * - You can specify your parameter names and values with URLSearchParams 
 * and then pass the URLSearchParams object as the value of the body 
 * property. If you do this, the body will be set to a string that looks 
 * like the query portion of a URL, and the “Content-Type” header will be 
 * automatically set to “application/x-www-formurlencoded; charset=UTF-8.”
 * 
 * - If instead you specify your parameter names and values with a 
 * FormData object, the body will use a more verbose multipart encoding 
 * and “Content-Type” will be set to “multipart/formdata; boundary=…” 
 * with a unique boundary string that matches the body. Using a FormData 
 * object is particularly useful when the values you want to upload are 
 * long, or are File or Blob objects that may each have its own 
 * “Content-Type.” FormData objects can be created and initialized with 
 * values by passing a <form> element to the FormData() constructor. But 
 * you can also create “multipart/form-data” request bodies by invoking 
 * the FormData() constructor with no arguments and initializing the name/
 * value pairs it represents with the set() and append() methods.
 */

// FILE UPLOAD WITH FETCH()

/**
 * Uploading files from a user’s computer to a web server is a common 
 * task and can be accomplished using a FormData object as the request 
 * body. A common way to obtain a File object is to display an <input 
 * type="file"> element on your web page and listen for “change” events 
 * on that element. When a “change” event occurs, the files array of the 
 * input element should contain at least one File object. File objects 
 * are also available through the HTML drag-and-drop API. That API is not 
 * covered in this book, but you can get files from the dataTransfer.
 * files array of the event object passed to an event listener for “drop” 
 * events.
 * 
 * Remember also that File objects are a kind of Blob, and sometimes it 
 * can be useful to upload Blobs. Suppose you’ve written a web 
 * application that allows the user to create drawings in a <canvas> 
 * element. You can upload the user’s drawings as PNG files with code 
 * like the following:
 */

// The canvas.toBlob() function is callback-based.
// This is a Promise-based wrapper for it.
async function getCanvasBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(resolve);
    });
}

// Here is how we upload the PNG file from a canvas
async function uploadCanvasImage(canvas) {
    let pngblob = await getCanvasBlob(canvas);
    let formdata = new FormData();
    formdata.set("canvasimage", pngblob);
    let response = await fetch("/upload", { method: "POST", 
    body: formdata });
    let body = await response.json();
}

// CROSS-ORIGIN REQUESTS

/**
 * Most often, fetch() is used by web applications to request data from 
 * their own web server. Requests like these are known as same-origin 
 * requests because the URL passed to fetch() has the same origin 
 * (protocol plus hostname plus port) as the document that contains the 
 * script that is making the request.
 * 
 * For security reasons, web browsers generally disallow (though there 
 * are exceptions for images and scripts) cross-origin network 
 * requests.   However, Cross-Origin Resource Sharing, or CORS, enables 
 * safe cross-origin requests. When fetch() is used with a cross-origin  
 * URL, the browser adds an “Origin” header to the request (and does not 
 * allow it to be overridden via the headers property) to notify the web 
 * server that the request is coming from a document with a different 
 * origin. If the server responds to the request with an appropriate 
 * “Access-Control-Allow-Origin” header, then the request proceeds. 
 * Otherwise, if the server does not explicitly allow the request, then 
 * the Promise returned by fetch() is rejected.
 */

// ABORTING A REQUEST

/**
 * Sometimes you may want to abort a fetch() request that you have 
 * already issued, perhaps because the user clicked a Cancel button or 
 * the request is taking too long. The fetch API allows requests to be 
 * aborted using the AbortController and AbortSignal classes. (These 
 * classes define a generic abort mechanism suitable for use by other 
 * APIs as well.)
 * 
 * If you want to have the option of aborting a fetch() request, then 
 * create an AbortController object before starting the request. The 
 * signal property of the controller object is an AbortSignal object. 
 * Pass this signal object as the value of the signal property of the 
 * options object that you pass to fetch(). Having done that, you can 
 * call the abort() method of the controller object to abort the request, 
 * which will cause any Promise objects related to the fetch request to 
 * reject with an exception.
 * 
 * Here is an example of using the AbortController mechanism to enforce a 
 * timeout for fetch requests:
 */

// This function is like fetch(), but it adds support for a timeout
// property in the options object and aborts the fetch if it is not complete
// within the number of milliseconds specified by that property.
function fetchWithTimeout(url, options={}) {
    if (options.timeout) { // If the timeout property exists and in nonzero
        let controller = new AbortController(); // Create a controller
        options.signal = controller.signal;// Set the signal property
        // Start a timer that will send the abort signal after the specified
        // number of millisenconds have passed. Note that we never cancel
        // this timer. Calling abort() after the fetch is complete has no effect.
        setTimeout(() => { controller.abort(); }, options.timeout);
    }
    // Now just perform a normal fetch
    return fetch(url,options);
}