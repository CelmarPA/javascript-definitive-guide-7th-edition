/**
 * One of the most important benefits of Promises is that they provide a 
 * natural way to express a sequence of asynchronous operations as a 
 * linear chain of then() method invocations, without having to nest each 
 * operation within the callback of the previous one. Here, for example, 
 * is a hypothetical Promise chain:
 */

fetch(documentURL) // Make an HTTP request
    .then(response => response.json()) // Ask for the JSON body of the response
    .then(document => { // When we get the parsed JSON
        return render(document); // display the document to the user
    })
    .then(rendered => { // When we get the rendered document
        cacheInDatabase(rendered); // cache it in the local database.
    })
    .cacht(error => HTMLHeadElement(error)); // Handle any errors that occur

/**
 * Earlier in this chapter, we saw the XMLHttpRequest object used to make 
 * an HTTP request in JavaScript. That strangely named object has an old 
 * and awkward API, and it has largely been replaced by the newer, 
 * Promise-based Fetch API (§15.11.1). In its simplest form, this new 
 * HTTP API is just the function fetch(). You pass it a URL, and it 
 * returns a Promise. That promise is fulfilled when the HTTP response 
 * begins to arrive and the HTTP status and headers are available:
 */

fetch("/api/user/porfile").then(response => {
    // When the promise resolves, we have status and headers
    if (response.ok &&
        response.headers.get("Content-Type") ===
        "aplication/json") {
            // What can we do here? We don't actually have the responde body yet.
        }
});

/**
 * When the Promise returned by fetch() is fulfilled, it passes a 
 * Response object to the function you passed to its then() method. This 
 * response object gives you access to request status and headers, and it 
 * also defines methods like text() and json(), which give you access to 
 * the body of the response in text and JSON-parsed forms, respectively. 
 * But although the initial Promise is fulfilled, the body of the 
 * response may not yet have arrived. So these text() and json() methods 
 * for accessing the body of the response themselves return Promises. 
 * Here’s a naive way of using fetch() and the response.json() method to 
 * get the body of an HTTP response:
 */

fetch("/api/user/profile").then(response => {
    response.json().then(profile => { // Ask for the JSON-parsed body
        // When the body of the response arrives, it will  be automatically
        // parsed as JSON and passed to this function.
        displayUserProfile(profile);
    });
});

/**
 * This is a naive way to use Promises because we nested them, like 
 * callbacks, which defeats the purpose. The preferred idiom is to use 
 * Promises in a sequential chain with code like this:
 */

fetch("/api/user/profile")
    .then(response => {
        return response.json();
    })
    .then(profile => {
        displayUserProfile(profile);
    });

/**
 * When more than one method is invoked in a single expression like this, 
 * we call it a method chain. We know that the fetch() function returns a 
 * Promise object, and we can see that the first .then() in this chain 
 * invokes a method on that returned Promise object. But there is a 
 * second .then() in the chain, which means that the first invocation of 
 * the then() method must itself return a Promise.
 * 
 * Sometimes, when an API is designed to use this kind of method 
 * chaining, there is just a single object, and each method of that 
 * object returns the object itself in order to facilitate chaining. That 
 * is not how Promises work, however. When we write a chain of .then() 
 * invocations, we are not registering multiple callbacks on a single 
 * Promise object. Instead, each invocation of the then() method returns 
 * a new Promise object. That new Promise object is not fulfilled until 
 * the function passed to then() is complete.
 * 
 * Let’s return to a simplified form of the original fetch() chain above. 
 * If we define the functions passed to the then() invocations elsewhere, 
 * we might refactor the code to look like this:
 */

fetch(theURL) // task 1; return promise 1
    .then(callback1) // task 2; return promise 2
    .then(callback2); //task 3; return promise 3

/**
 * Let’s walk through this code in detail:
 * 
 * 1. On the first line, fetch() is invoked with a URL. It initiates an 
 * HTTP GET request for that URL and returns a Promise. We’ll call this 
 * HTTP request “task 1” and we’ll call the Promise “promise 1”.
 * 
 * 2. On the second line, we invoke the then() method of  promise 1, 
 * passing the callback1 function that we want to be invoked when promise 
 * 1 is fulfilled. The then() method stores our callback somewhere, then 
 * returns a new Promise. We’ll call the new Promise returned at this 
 * step “promise 2”, and we’ll say that “task 2” begins when callback1 is 
 * invoked. 
 * 
 * 3. On the third line, we invoke the then() method of promise 2, 
 * passing the callback2 function we want invoked when promise 2 is 
 * fulfilled. This then() method remembers our callback and returns yet 
 * another Promise. We’ll say that “task 3” begins when callback2 is 
 * invoked. We can call this latest Promise “promise 3”, but we don’t 
 * really need a name for it because we won’t be using it at all.
 * 
 * 4. The previous three steps all happen synchronously when the 
 * expression is first executed. Now we have an asynchronous pause while 
 * the HTTP request initiated in step 1 is sent out across the internet.
 * 
 * 5. Eventually, the HTTP response starts to arrive. The asynchronous 
 * part of the fetch() call wraps the HTTP status and headers in a 
 * Response object and fulfills promise 1 with that Response object as 
 * the value.
 * 
 * 6. When promise 1 is fulfilled, its value (the Response object) is 
 * passed to our callback1() function, and task 2 begins. The job of this 
 * task, given a Response object as input, is to obtain the response body 
 * as a JSON object.
 * 
 * 7. Let’s assume that task 2 completes normally and is able to parse 
 * the body of the HTTP response to produce a JSON object. This JSON 
 * object is used to fulfill promise 2.
 * 
 * 8. The value that fulfills promise 2 becomes the input to task 3 when 
 * it is passed to the callback2() function. This third task now displays 
 * the data to the user in some unspecified way. When task 3 is complete 
 * (assuming it completes normally), then promise 3 will be fulfilled. 
 * But because we never did anything with promise 3, nothing happens when 
 * that Promise settles, and the chain of asynchronous computation ends 
 * at this point.
 */
