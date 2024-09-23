/**
 * If you are using the Date class to actually keep track of dates and 
 * times (as opposed to just measuring time intervals), then you are 
 * likely to need to display dates and times to the users of your code. 
 * The Date class defines a number of different methods for converting 
 * Date objects to strings. Here are some examples:
 */

let d = new Date(2020, 0, 1, 17, 10, 30); // 5:10:30pm on New Year's Day 2020
console.log(d.toString()); // => "Wed Jan 01 2020 17:10:30 GMT-0300 (Horário Padrão de Brasília)"
console.log(d.toUTCString()); // => "Wed, 01 Jan 2020 20:10:30 GMT"
console.log(d.toLocaleDateString()); // => "01/01/2020" 'pt-BR' locale
console.log(d.toLocaleTimeString()); // => "17:10:30": 'pt-BR' locale
console.log(d.toISOString()); // => "2020-01-01T20:10:30.000Z"

// This is a full list of the string formatting methods of the Date class:

/**
 * toString(): This method uses the local time zone but does not format 
 * the date and time in a locale-aware way.
 * 
 * toUTCString(): This method uses the UTC time zone but does not format 
 * the date in a locale-aware way.
 * 
 * toISOString(): This method prints the date and time in the standard 
 * year-monthday hours:minutes:seconds.ms format of the ISO-8601 standard.
 * The letter “T” separates the date portion of the output from the time
 * portion of the output. The time is expressed in UTC, and this is
 * indicated with the letter “Z” as the last letter of the output.
 * 
 * toLocaleString(): This method uses the local time zone and a format 
 * that is appropriate for the user’s locale.
 * 
 * toDateString(): This method formats only the date portion of the Date 
 * and omits the time. It uses the local time zone and does not do 
 * localeappropriate formatting.
 * 
 * toLocaleDateString(): This method formats only the date. It uses the 
 * local time zone and a locale-appropriate date format.
 * 
 * toTimeString(): This method formats only the time and omits the date. 
 * It uses the local time zone but does not format the time in a 
 * locale-aware way.
 * 
 * toLocaleTimeString(): This method formats the time in a locale-aware 
 * way and uses the local time zone.
 */

/**
 * Finally, in addition to these methods that convert a Date object to a
 * string, there is also a static Date.parse() method that takes a string
 * as its argument, attempts to parse it as a date and time, and returns a
 * timestamp representing that date. Date.parse() is able to parse the
 * same strings that the Date() constructor can and is guaranteed to be
 * able to parse the output of toISOString(), toUTCString(),
 * and toString().
 */