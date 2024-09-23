/**
 * ES2017 introduces two new keywords—async and await—that represent a 
 * paradigm shift in asynchronous JavaScript programming. These new 
 * keywords dramatically simplify the use of Promises and allow us to 
 * write Promise-based, asynchronous code that looks like synchronous 
 * code that blocks while waiting for network responses or other 
 * asynchronous events. Although it is still important to understand how 
 * Promises work, much of their complexity (and sometimes even their very 
 * presence!) vanishes when you use them with async and await.
 */

const { get } = require("http");

/**
 * As we discussed earlier in the chapter, asynchronous code can’t return 
 * a value or throw an exception the way that regular synchronous code 
 * can. And this is why Promises are designed the way the are. The value 
 * of a fulfilled Promise is like the return value of a synchronous 
 * function. And the value of a rejected Promise is like a value thrown 
 * by a synchronous function. This latter similarity is made explicit by 
 * the naming of the .catch() method. async and await take efficient, 
 * Promise-based code and hide the Promises so that your asynchronous 
 * code can be as easy to read and as easy to reason about as 
 * inefficient, blocking, synchronous code.
 */

// await Expressions

/**
 * The await keyword takes a Promise and turns it back into a return 
 * value or a thrown exception. Given a Promise object p, the expression 
 * await p waits until p settles. If p fulfills, then the value of await 
 * p is the fulfillment value of p. On the other hand, if p is rejected, 
 * then the await p expression throws the rejection value of p. We don’t 
 * usually use await with a variable that holds a Promise; instead, we 
 * use it before the invocation of a function that returns a Promise:
 *      let response = await fetch("/api/user/profile");
 *      let profile = await response.json();
 */

/**
 * It is critical to understand right away that the await keyword does 
 * not cause your program to block and literally do nothing until the 
 * specified Promise settles. The code remains asynchronous, and the 
 * await simply disguises this fact. This means that any code that uses 
 * await is itself asynchronous.
 */

// async Functions

/**
 * Because any code that uses await is asynchronous, there is one 
 * critical rule: you can only use the await keyword within functions 
 * that have been declared with the async keyword. Here’s a version of 
 * the getHighScore(), rewritten to use async and await:
 */

async function getHighScore() {
    let response = await fetch("/api/user/profile");
    let profile = await response.json();
    return profile.highScore;
}

/**
 * Declaring a function async means that the return value of the function 
 * will be a Promise even if no Promise-related code appears in the body  
 * of the function. If an async function appears to return normally, then 
 * the Promise object that is the real return value of the function will 
 * resolve to that apparent return value. And if an async function 
 * appears to throw an exception, then the Promise object that it returns 
 * will be rejected with that exception.
 */

/**
 * The getHighScore() function is declared async, so it returns a 
 * Promise. And because it returns a Promise, we can use the await 
 * keyword with it:
 */

displayHighScore(await getHighScore());

/**
 * But remember, that line of code will only work if it is inside another 
 * async function! You can nest await expressions within async functions 
 * as deeply as you want. But if you’re at the top level or are inside a 
 * function that is not async for some reason, then you can’t use await 
 * and have to deal with a returned Promise in the regular way:
 */

getHighScore().then(displayHighScore).catch(console.error);

/**
 * You can use the async keyword with any kind of function. It works with 
 * the function keyword as a statement or as an expression. It works with 
 * arrow functions and with the method shortcut form in classes and 
 * object literals.
 */

// Awaiting Multiple Promises

// Suppose that we’ve written our getJSON() function using async:
async function getJSON(url) {
    let responde = await fetch(url);
    let body = await responde.json();
    return body;
}

// And now suppose that we want to fetch two JSON values with this function:
let value01 = await getJSON(url1);
let value02 = await getJSON(url2);

/**
 * The problem with this code is that it is unnecessarily sequential: the 
 * fetch of the second URL will not begin until the first fetch is 
 * complete. If the second URL does not depend on the value obtained from 
 * the first URL, then we should probably try to fetch the two values at 
 * the same time. This is a case where the Promise-based nature of async 
 * functions shows. In order to await a set of concurrently executing 
 * async functions, we use Promise.all() just as we would if working with 
 * Promises directly:
 */

let [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);

// Implementation Details

/**
 * Finally, in order to understand how async functions work, it may help 
 * to think about what is going on under the hood.
 * Suppose you write an async function like this:
 */

async function f(x) { /* body */ }

/**
 * You can think about this as a Promise-returning function wrapped 
 * around the body of your original function:
 */

function f(x) {
    return new Promise(function(resolve, reject) {
        try {
            resolve((function(x) { /* body */ })(x));
        }
        catch(e) {
            reject(e);
        }
    });
}

/**
 * It is harder to express the await keyword in terms of a syntax
transformation like this one. But think of the await keyword as a
marker that breaks a function body up into separate, synchronous
chunks. An ES2017 interpreter can break the function body up into a
sequence of separate subfunctions, each of which gets passed to the
then() method of the await-marked Promise that precedes it.
 */