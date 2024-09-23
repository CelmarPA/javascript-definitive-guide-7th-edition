// Import the function we are going to test
const getTemperature = require("./getTemperature.js");

// And mock the getJSON() module that getTemperature() depends on
jest.mock("./getJSON");
const getJSON = require("./getJSON.js");

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