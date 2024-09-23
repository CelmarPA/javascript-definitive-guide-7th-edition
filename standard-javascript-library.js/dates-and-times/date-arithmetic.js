/**
 * Date objects can be compared with JavaScript’s standard <, <=, >, and
 * >= comparison operators. And you can subtract one Date object from
 * another to determine the number of milliseconds between the two
 * dates. (This works because the Date class defines a valueOf()
 * method that returns a timestamp.)
 */

/**
 * If you want to add or subtract a specified number of seconds, minutes,
 * or hours from a Date, it is often easiest to simply modify the 
 * timestamp as demonstrated in the previous example, when we added 30 
 * seconds to a date. This technique becomes more cumbersome if you want 
 * to add days, and it does not work at all for months and years since 
 * they have varying numbers of days. To do date arithmetic involving 
 * days, months, and years, you can use setDate(), setMonth(), and
 * setYear(). Here, for example, is code that adds three months and
 * two weeks to the current date:
 */

let d = new Date();
d.setMonth(d.getMonth() + 3, d.getDate() + 14);

/**
 * Date setting methods work correctly even when they overflow. When
 * we add three months to the current month, we can end up with a value
 * greater than 11 (which represents December). The setMonth()
 * handles this by incrementing the year as needed. Similarly, when we
 * set the day of the month to a value larger than the number of days in
 * the month, the month gets incremented appropriately.
 */