/**
 * Another common source of asynchrony in JavaScript programming is 
 * network requests. JavaScript running in the browser can fetch data 
 * from a web server with code like this:
 */
function getCurrentVersionNumber(versionCallback) { // Note callback argument
    // Make a scripted HTTP request to a backend version API
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.example.com/api/version");
    request.send();

    // Register a callback that will be invoked when the response arrives
    request.onload = function() {
        if (request.status === 200) {
            // If HTTP status is good, get version number and call callback
            let currentVersion = parseFloat(request.responseText);
            versionCallback(null, currentVersion);
        } else {
            // Otherwise report an error to the callback
            versionCallback(response.statusText, null)
        }
    };
    // Register another callback that will be invoked for network erros
    request.onerror = request.ontimeout = function(e) {
        versionCallback(e.type, null);
    };
}

/**
 * Notice that the code example above does not call addEventListener() as 
 * our previous example did. For most web APIs (including this one), 
 * event handlers can be defined by invoking addEventListener() on the 
 * object generating the event and passing the name of the event of 
 * interest along with the callback function. Typically, though, you can 
 * also register a single event listener by assigning it directly to a 
 * property of the object. That is what we do in this example code, 
 * assigning functions to the onload, onerror, and ontimeout properties. 
 * By convention, event listener properties like these always have names 
 * that begin with on. addEventListener() is the more flexible technique 
 * because it allows for multiple event handlers. But in cases where you 
 * are sure that no other code will need to register a listener for the 
 * same object and event type, it can be simpler to simply set the 
 * appropriate property to your callback.
 */

/**
 * Another thing to note about the getCurrentVersionNumber() function in 
 * this example code is that, because it makes an asynchronous request, 
 * it cannot synchronously return the value (the current version number) 
 * that the caller is interested in. Instead, the caller passes a 
 * callback function, which is invoked when the result is ready or when 
 * an error occurs. In this case, the caller supplies a callback function 
 * that expects two arguments. If the XMLHttpRequest works correctly, 
 * then getCurrentVersionNumber() invokes the callback with a null first 
 * argument and the version number as the second argument. Or, if an 
 * error occurs, then getCurrentVersionNumber() invokes the callback with 
 * error details in the first argument and null as the second argument.
 */