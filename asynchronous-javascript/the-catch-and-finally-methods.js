/**
 * The .catch() method of a Promise is simply a shorthand way to call 
 * .then() with null as the first argument and an error-handling callback 
 * as the second argument. Given any Promise p and a callback  c, the 
 * following two lines are equivalent:
 */

p.then(null, c);
p.catch(c);

/**
 * The .catch() shorthand is preferred because it is simpler and because 
 * the name matches the catch clause in a try/catch exception-handling 
 * statement. As we’ve discussed, normal exceptions don’t work with 
 * asynchronous code. The .catch() method of Promises is an alternative 
 * that does work for asynchronous code. When something goes wrong in 
 * synchronous code, we can speak of an exception “bubbling up the call 
 * stack” until it finds a catch block. With an asynchronous chain of 
 * Promises, the comparable metaphor might be of an error “trickling down 
 * the chain” until it finds a .catch() invocation.
 * 
 * In ES2018, Promise objects also define a .finally() method whose 
 * purpose is similar to the finally clause in a try/catch/finally 
 * statement. If you add a .finally() invocation to your Promise chain, 
 * then the callback you pass to  .finally() will be invoked when the 
 * Promise you called it on  settles. Your callback will be invoked if 
 * the Promise fulfills or rejects, and it will not be passed any 
 * arguments, so you can’t find out whether it fulfilled or rejected. But 
 * if you need to run some kind of cleanup code (such as closing open 
 * files or network connections) in either case, a .finally() callback is 
 * the ideal way to do that. Like .then() and .catch(), .finally() 
 * returns a new Promise object. The return value of a .finally() 
 * callback is generally ignored, and the Promise returned by .finally() 
 * will typically resolve or reject with the same value that the Promise 
 * that .finally() was invoked on resolves or rejects with. If a .finally
 * () callback throws an exception, however, then the Promise returned 
 * by .finally() will reject with that value.
 * 
 * The URL-fetching code that we studied in the previous sections did not 
 * do any error handling. Let’s correct that now with a more realistic 
 * version of the code:
 */

fetch("/api/user/profile") // Start the HTTP request
.then(response => { // Call this when status  and headers are ready
    if (!response.ok) { // If we got a 404 Not Found or similar error
        return null; // Maybe user is logged out; return null profile
    }

    // Now check the headers to ensure that the server sent us JSON.
    // If not, out server is broken, and this is a serious error!
    let type = response.headers.get("content-type");
    if (type !== "application/json") {
        throw new TypeError(`Expected JSON, got ${type}`);
    }

    // If we get here, then we got a 2xx status and a JSON content-type
    // so we can confidently return a Promise for the response
    // body as a JSON object.
    return response.json();
})
.then(profile => { // Called with the parsed response body or null
    if (profile) {
        displayUserProfile(profile);
    }
    else { // Of we got a 404 error above and returned null we end up here
        displayLoggerdOutProfilePage();
    }
})
.catch(e => {
    if (e instanceof NetworkError) {
        // fetch() can fail this way if the internet connection is down
        displayErrorMessage("Check your internet connection.");
    }
    else if (e instanceof TypeError) {
        // This happens if we throw TypeError above
        displayErrorMessage("Something is wrong with our server!");
    }
    else {
        // This must be some king of unanticipated error
        console.error(e);
    }
});

/**
 * Before we leave the topic of error handling, I want to point out that, 
 * although it is idiomatic to end every Promise chain with a .catch() to 
 * clean up (or at least log) any errors that occurred in the chain, it 
 * is also perfectly valid to use .catch() elsewhere in a Promise chain. 
 * If one of the stages in your Promise chain can fail with an error, and 
 * if the error is some kind of recoverable error that should not stop 
 * the rest of the chain from running, then you can insert a .catch() 
 * call in the chain, resulting in code that might look like this:
 */

startAsyncOperation()
    .then(doStageTwo)
    .catch(recoverFromStageTwoError)
    .then(doStageThree)
    .then(doStageFour)
    .catch(logStateThreeAndFourErrors);

/**
 * Remember that the callback you pass to .catch() will only be invoked 
 * if the callback at a previous stage throws an error. If the callback 
 * returns normally, then the .catch() callback will be skipped, and the 
 * return value of the previous callback will become the input to the 
 * next .then() callback. Also remember that .catch() callbacks are not 
 * just for reporting errors, but for handling and recovering from 
 * errors. Once an error has been passed to a .catch() callback, it stops 
 * propagating down the Promise chain. A .catch() callback can throw a 
 * new error, but if it returns normally, than that return value is used 
 * to resolve and/or fulfill the associated Promise, and the error stops 
 * propagating.
 * 
 * Let’s be concrete about this: in the preceding code example, if either 
 * startAsyncOperation() or doStageTwo() throws an error, then the 
 * recoverFromStageTwoError() function will be invoked. If 
 * recoverFromStageTwoError() returns normally, then its return value 
 * will be passed to doStageThree() and the asynchronous operation 
 * continues normally. On the other hand, if recoverFromStageTwoError() 
 * was unable to recover, it will itself throw an error (or it will 
 * rethrow the error that it was passed). In this case, neither 
 * doStageThree() nor doStageFour() will be invoked, and the error thrown 
 * by recoverFromStageTwoError() would be passed to 
 * logStageThreeAndFourErrors().
 */

/**
 * Sometimes, in complex network environments, errors can occur more or 
 * less at random, and it can be appropriate to handle those errors by 
 * simply retrying the asynchronous request. Imagine you’ve written a 
 * Promise-based operation to query a database:
 */

queryDatabase()
    .then(displauTable)
    .catch(displayDatabaseError);

/**
 * Now suppose that transient network load issues are causing this to 
 * fail about 1% of the time. A simple solution might be to retry the 
 * query with a .catch() call:
 */

queryDatabase()
    .catch(e => wait(500).then(queryDatabase)) // On failure, wait adn retry
    .then(displayTable)
    .catch(displayDatabaseError);

/**
 * If the hypothetical failures are truly random, then adding this one 
 * line of code should reduce your error rate from 1% to .01%.
 */