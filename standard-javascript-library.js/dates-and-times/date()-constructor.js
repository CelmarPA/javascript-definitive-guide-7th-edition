let now = new Date(); // The current time

// If you pass one numeric argument, the Date() constructor interprets
// that argument as the number of milliseconds since the 1970 epoch:

let epoch = new Date(0); // Midnight, January 1st, 1970, GMT

// If you specify two or more integer arguments, they are interpreted as
// the year, month, day-of-month, hour, minute, second, and millisecond
// in your local time zone, as in the following:

let century1 = new Date(2100, // Year 2100
                       0, // January
                       1, // 1st
                       2, 3, 4, 5); // 02,03,04.005, local time

/**
 * Note that when invoked with multiple numbers, the Date()
 * constructor interprets them using whatever time zone the local
 * computer is set to. If you want to specify a date and time in UTC
 * (Universal Coordinated Time, aka GMT), then you can use the
 * Date.UTC().
 */
// Midnight in England, January 1, 2100
let century = new Date(Date.UTC(2100, 0, 1));

// If you want to display a date in UTC, you should explicitly convert
// it to a string with toUTCString() or toISOString().

console.log(century.toUTCString());
console.log(century.toISOString());

/**
 * Finally, if you pass a string to the Date() constructor, it will
 * attempt to parse that string as a date and time specification. The
 * constructor can parse dates specified in the formats produced by the 
 * toString(), toUTCString(), and toISOString() methods:
 */

let cent = new Date("2100-01-01T00:00:00Z"); // An ISO format date

// To get or set the year of a Date object, for example, you would use 
// getFullYear(), getUTCFullYear(), setFullYear(), or setUTCFullYear():

let d = new Date(); // Start with the current date
d.setFullYear(d.getFullYear() + 1); // Increment the year

/**
 * To get or set the other fields of a Date, replace “FullYear” in the
 * method name with “Month”, “Date”, “Hours”, “Minutes”, “Seconds”,
 * or “Milliseconds”. Some of the date set methods allow you to set more
 * than one field at a time. setFullYear() and setUTCFullYear() also 
 * optionally allow you to set the month and day-of-month as well. And 
 * setHours() and setUTCHours() allow you to specify the minutes, 
 * seconds, and milliseconds fields in addition to the hours field.
 * Note that the methods for querying the day-of-month are getDate()
 * and getUTCDate(). The more natural-sounding functions getDay() and 
 * getUTCDay() return the day-of-week (0 for Sunday through 6 for 
 * Saturday). The day-of-week is read-only, so there is not a 
 * corresponding setDay() method.
 */
