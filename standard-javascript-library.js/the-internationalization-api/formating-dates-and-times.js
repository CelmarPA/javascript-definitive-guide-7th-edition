/**
 * The Intl.DateTimeFormat class is a lot like the Intl.NumberFormat
 * class. The Intl.DateTimeFormat() constructor takes the same
 * two arguments that Intl.NumberFormat() does: a locale or array
 * of locales and an object of formatting options. And the way you use an
 * Intl.DateTimeFormat instance is by calling its format() method to
 * convert a Date object to a string.
 * The Date class defines simple toLocaleDateString() and 
 * toLocaleTimeString() methods that produce locale-appropriate output 
 * for the user’s locale. But these methods don’t give you any control 
 * over what fields of the date and time are displayed.
 */

/**
 * The available options are the following. Only specify properties for 
 * date and time fields that you would like to appear in the formatted
 * output.
 * 
 * year: Use "numeric" for a full, four-digit year or "2-digit" for a
 * two-digit abbreviation.
 * 
 * month: Use "numeric" for a possibly short number like “1”, or "2-
 * digit" for a numeric representation that always has two digits,
 * like “01”. Use "long" for a full name like “January”, "short"
 * for an abbreviated name like “Jan”, and "narrow" for a highly
 * abbreviated name like “J” that is not guaranteed to be unique.
 * 
 * day: Use "numeric" for a one- or two-digit number or "2-digit"
 * for a two-digit number for the day-of-month.
 * 
 * weekday: Use "long" for a full name like “Monday”, "short" for an
 * abbreviated name like “Mon”, and "narrow" for a highly
 * abbreviated name like “M” that is not guaranteed to be unique.
 * 
 * era: This property specifies whether a date should be formatted with an
 * era, such as CE or BCE. This may be useful if you are formatting
 * dates from very long ago or if you are using a Japanese calendar.
 * Legal values are "long", "short", and "narrow".
 * 
 * hour, minute, second: These properties specify how you would like time 
 * displayed. Use"numeric" for a one- or two-digit field or "2-digit" to 
 * force single-digit numbers to be padded on the left with a 0.
 * 
 * timeZone: This property specifies the desired time zone for which the 
 * date should be formatted. If omitted, the local time zone is used.
 * Implementations always recognize “UTC” and may also recognize
 * Internet Assigned Numbers Authority (IANA) time zone names,
 * such as “America/Los_Angeles”.
 * 
 * timeZoneName: This property specifies how the time zone should be 
 * displayed in a formatted date or time. Use "long" for a fully 
 * spelled-out time zone name and "short" for an abbreviated or numeric 
 * time zone.
 * 
 * hour12: This boolean property specifies whether or not to use 12-hour 
 * time. The default is locale dependent, but you can override it with 
 * this property.
 * 
 * hourCycle: This property allows you to specify whether midnight is 
 * written as 0 hours, 12 hours, or 24 hours. The default is locale 
 * dependent, but you can override the default with this property. Note 
 * that hour12 takes precedence over this property. Use the value "h11" to
 * specify that midnight is 0 and the hour before midnight is 11pm.
 * Use "h12" to specify that midnight is 12. Use "h23" to specify
 * that midnight is 0 and the hour before midnight is 23. And use
 * "h24" to specify that midnight is 24.
 */

// Here are some examples:

let d = new Date("2020-01-02T13:14:15Z"); // January 2nd, 2020, 13:14:15 UTC

// With no options, we get a basic numeric date format
console.log(Intl.DateTimeFormat("en-US").format(d)); // => "1/2/2020"
console.log(Intl.DateTimeFormat("fr-FR").format(d)); // => "02/01/2020"

// Spelled out weekday and month
let opts = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
console.log(Intl.DateTimeFormat("en-US", opts).format(d)); // "Thursday, January 2, 2020"
console.log(Intl.DateTimeFormat("es-ES", opts).format(d)); // "jueves, 2 de enero de 2020"

// The time in New York, for a French-speaking Canadian
options = { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" };
console.log(Intl.DateTimeFormat("fr-CA", options).format(d)); // "8 h 14"

/**
 * Intl.DateTimeFormat can display dates using calendars other than the
 * default Julian calendar based on the Christian era. Although some
 * locales may use a non-Christian calendar by default, you can always
 * explicitly specify the calendar to use by adding -u-ca- to the locale
 * and following that with the name of the calendar. Possible calendar
 * names include “buddhist”, “chinese”, “coptic”, “ethiopic”, “gregory”,
 * “hebrew”, “indian”, “islamic”, “iso8601”, “japanese”, and “persian”.
 */

// Continuing the preceding example, we can determine the year in
// various non-Christian calendars

let option = { year: "numeric", era: "short" };
console.log(Intl.DateTimeFormat("en", option).format(d)); // "2020 AD"
console.log(Intl.DateTimeFormat("en-u-ca-iso8601", option).format(d)); // "2020 AD"
console.log(Intl.DateTimeFormat("en-u-ca-hebrew", option).format(d)); // "5780 AM"
console.log(Intl.DateTimeFormat("en-u-ca-buddhist", option).format(d)); // "2563 BE"
console.log(Intl.DateTimeFormat("en-u-ca-islamic", option).format(d)); // "1441 AH"
console.log(Intl.DateTimeFormat("en-u-ca-persian", option).format(d)); // "1398 AP"
console.log(Intl.DateTimeFormat("en-u-ca-indian", option).format(d)); // "1941 Saka"
console.log(Intl.DateTimeFormat("en-u-ca-chinese",option).format(d)); // "2019(ji-hai)"
console.log(Intl.DateTimeFormat("en-u-ca-japanese", option).format(d)); // "2 Reiwa"