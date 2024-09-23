/**
 * Writing tests is an important part of any nontrivial programming 
 * project. Dynamic languages like JavaScript support testing frameworks 
 * that dramatically reduce the effort required to write tests, and 
 * almost  make test writing fun! There are a lot of test tools and 
 * libraries for JavaScript, and many are written in a modular way so 
 * that it is possible to pick one library as your test runner, another 
 * library for assertions, and a third for mocking. In this section, 
 * however, we’ll describe Jest, which is a popular framework that 
 * includes everything you need in a single package.
 * 
 * Suppose you’ve written the following function:
 */
const getJSON = require("./getJSON.js");

/**
* getTemperature() takes the name of a city as its input, and returns
* a Promise that will resolve to the current temperature of that city,
* in degrees Fahrenheit. It relies on a (fake) web service that returns
* world temperatures in degrees Celsius.
*/
module.exports = async function getTemperature(city) {
    // Get the temperature in Celsius from the web service
    let c = await getJSON(

`https://globaltemps.example.com/api/city/${city.toLowerCase()}`

    );
    // Convert to Fahrenheit and return that value.
    return (c * 5 / 9) + 32; // TODO: double-check this formula
};

/**
 * A good set of tests for this function might verify that 
 * getTemperature() is fetching the right URL, and that it is converting 
 * temperature scales correctly. We can do this with a Jestbased test 
 * like the following. This code defines a mock implementation of 
 * getJSON() so that the test does not actually make a network request. 
 * And because getTemperature() is an async function, the tests are async 
 * as well—it can be tricky to test asynchronous functions, but Jest 
 * makes it relatively easy:
 */

// Import the function we are going to test
const getTemperature = require("./getTemperature.js");

// And mock the getJSON() module that getTemperature() depends on
jest.mock("./getJSON");
const getJSON = require(",/getJSON.js");

// Tell the mock getJSON() function to return an already resolved Promise
// with fulfillment value 0.
getJSON.mockResolvedValue(0);

// Our set of tests for getTemperature() begins here
describe("getTemperature()", () => {
    // This is the first test. We're ensuring that getTemperature() calls
    // getJSON() with the URL that we expect
    test("Invokes the correct API", async () => {
        let expectedURL = "https://globaltemps.example.com/api/city/vancouver";
        let t = await(getTemperature("Vancouver"));
        // Jest mocks remember how they were called, and we can check that.
        expect(getJSON).toHaveBeenCalledWith(expectedURL);
    });

    // This second test verifies that getTemperature() converts
    // Celsius to Fahrenheit correctly
    test("COnverst C to F correctly", async () => {
        getJSON.mockResolvedValue(0); // If getJSON returns 0C
        expect(await getTemperature("x")).toBe(32); // We expect 32F

        // 100C should convert to 212F
        getJSON.mockResolvedValue(100); // If getJSON returns 100C
        expect(await getTemperature("x")).toBe(212); // We expect 212F
    });
});

/**
 * With the test written, we can use the jest command to run it, and we 
 * discover that one of our tests fails:
 * 
$ jest getTemperature
FAIL ch17/getTemperature.test.js
getTemperature()
✓ Invokes the correct API (4ms)
✕ Converts C to F correctly (3ms)
● getTemperature() › Converts C to F correctly
expect(received).toBe(expected) // Object.is equality
Expected: 212
Received: 87.55555555555556
29 | // 100C should convert to 212F
30 | getJSON.mockResolvedValue(100); // If
getJSON returns 100C
> 31 | expect(await
getTemperature("x")).toBe(212); // Expect 212F
| ^
32 | });
33 | });
34 |
at Object.<anonymous>
(ch17/getTemperature.test.js:31:43)
Test Suites: 1 failed, 1 total
Tests: 1 failed, 1 passed, 2 total
Snapshots: 0 total
Time: 1.403s
Ran all test suites matching /getTemperature/i.
 */

/**
 * Our getTemperature() implementation is using the wrong formula for 
 * converting C to F. It multiplies by 5 and divides by 9 rather than 
 * multiplying by 9 and dividing by 5. If we fix the code and run Jest 
 * again, we can see the tests pass. And, as a bonus, if we add the -- 
 * coverage argument when we invoke jest, it will compute and display the 
 * code coverage for our tests:
 */