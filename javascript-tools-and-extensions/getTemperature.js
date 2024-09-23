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
    return (c * 9 / 5) + 32; // TODO: double-check this formula
};