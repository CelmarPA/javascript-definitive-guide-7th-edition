/**
 * Users around the world expect numbers to be formatted in different
 * ways. Decimal points can be periods or commas. Thousands separators
 * can be commas or periods, and they aren’t used every three digits in 
 * all places. Some currencies are divided into hundredths, some into
 * thousandths, and some have no subdivisions. Finally, although the 
 * socalled “Arabic numerals” 0 through 9 are used in many languages, this
 * is not universal, and users in some countries will expect to see
 * numbers written using the digits from their own scripts.
 */

/**
 * The Intl.NumberFormat class defines a format() method that takes
 * all of these formatting possibilities into account. The constructor 
 * takes two arguments. The first argument specifies the locale that the 
 * number should be formatted for and the second is an object that 
 * specifies more details about how the number should be formatted. If 
 * the first argument is omitted or undefined, then the system locale 
 * (which we assume to be the user’s preferred locale) will be used. If 
 * the first argument is a string, it specifies a desired locale, such as 
 * "en-US" (English as used in the United States), "fr" (French), or 
 * "zh-Hans-CN" (Chinese, using the simplified Han writing system, in 
 * China). The first argument can also be an array of locale strings, and 
 * in this case, Intl.NumberFormat will choose the most specific one that 
 * is well supported.
 */

/**
 * The second argument to the Intl.NumberFormat() constructor, if
 * specified, should be an object that defines one or more of the 
 * following properties:
 * 
 * style: Specifies the kind of number formatting that is required. The
 * default is "decimal". Specify "percent" to format a number
 * as a percentage or specify "currency" to specify a number as an
 * amount of money.
 * 
 * currency: If style is "currency", then this property is required to
 * specify the three-letter ISO currency code (such as "USD" for US
 * dollars or "GBP" for British pounds) of the desired currency.
 * 
 * currencyDisplay: If style is "currency", then this property specifies 
 * how the currency is displayed. The default value "symbol" uses a
 * currency symbol if the currency has one. The value "code" uses
 * the three-letter ISO code, and the value "name" spells out the
 * name of the currency in long form.
 * 
 * useGrouping: Set this property to false if you do not want numbers to 
 * have thousands separators (or their locale-appropriate equivalents).
 * 
 * minimumIntegerDigits: The minimum number of digits to use to display 
 * the integer part of the number. If the number has fewer digits than 
 * this, it will be padded on the left with zeros. The default value is 
 * 1, but you can use values as high as 21.
 * 
 * minimumFractionDigits, maximumFractionDigits: These two properties 
 * control the formatting of the fractional part of the number. If a 
 * number has fewer fractional digits than the minimum, it will be padded 
 * with zeros on the right. If it has more than the maximum, then the 
 * fractional part will be rounded. Legal values for both properties are 
 * between 0 and 20. The default minimum is 0 and the default maximum is 
 * 3, except when formatting monetary amounts, when the length of the 
 * fractional part varies depending on the specified currency.
 * 
 * minimumSignificantDigits, maximumSignificantDigits: These properties 
 * control the number of significant digits used when formatting a 
 * number, making them suitable when formatting scientific data, for 
 * example. If specified, these properties override the integer and 
 * fractional digit properties listed previously. Legal values are 
 * between 1 and 21.
 */

// Once you have created an Intl.NumberFormat object with the desired
// locale and options, you use it by passing a number to its format()
// method, which returns an appropriately formatted string. For example:

let euros = Intl.NumberFormat("es", {style: "currency", currency: "EUR"});
console.log(euros.format(10)); // => "10,00 €": ten euros, Spanish formatting

let pounds = Intl.NumberFormat("en", {style: "currency", currency: "GBP"});
console.log(pounds.format(1000)); // =>"£1,000.00": one thousands pounds, English formating

let dollars = Intl.NumberFormat("en-us", {style: "currency", currency: "USD"});
console.log(dollars.format(1000)); // => "$1,000.00": one thousands dollars, US English formating

let reals = Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"});
console.log(reals.format(1000)); // => "R$ 1.000,00": one thousands reals, Brazilian Portuguese formating

/**
 * A useful feature of Intl.NumberFormat (and the other Intl classes
 * as well) is that its format() method is bound to the NumberFormat
 * object to which it belongs. So instead of defining a variable that
 * refers to the formatting object and then invoking the format() method 
 * on that, you can just assign the format() method to a variable and use 
 * it as if it were a standalone function, as in this example:
 */

let data = [0.05, .75, 1];
let formatData = Intl.NumberFormat("en-us", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
}).format;

console.log(data.map(formatData)); // => [ '5,0%', '75,0%', '100,0%' ]: inm en-US locale

// Some languages, such as Arabic, use their own script for decimal digits:
let arabic = Intl.NumberFormat("ar", {useGrouping: false}).format;
console.log(arabic(1234567890)); // => "١٢٣٤٥٦٧٨٩٠"

/**
 * Other languages, such as Hindi, use a script that has its own set of
 * digits, but tend to use the ASCII digits 0–9 by default. If you want to
 * override the default script used for digits, add -u-nu- to the locale
 * and follow it with an abbreviated script name. You can format numbers
 * with Indian-style grouping and Devanagari digits like this, for
 * example:
 */

let hindi = Intl.NumberFormat("hi-IN-u-nu-deva").format;
console.log(hindi(1234567890)); // => "१,२३,४५,६७,८९०"

/**
 * -u- in a locale specifies that what comes next is a Unicode extension.
 * nu is the extension name for the numbering system, and deva is short
 * for Devanagari. The Intl API standard defines names for a number of
 * other numbering systems, mostly for the Indic languages of South and
 * Southeast Asia.
 */