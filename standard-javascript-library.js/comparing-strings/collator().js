/**
 * If you want to display strings to a user in an order that they will 
 * find natural, it is not enough use the sort() method on an array of 
 * strings. But if you create an Intl.Collator object, you can pass the 
 * compare() method of that object to the sort() method to perform 
 * locale-appropriate sorting of the strings. Intl.Collator objects can be
 * configured so that the compare() method performs case-insensitive
 * comparisons or even comparisons that only consider the base letter and
 * ignore accents and other diacritics.
 * Like Intl.NumberFormat() and Intl.DateTimeFormat(), the Intl.Collator
 * () constructor takes two arguments. The first specifies a locale or an 
 * array of locales, and the second is an optional object whose 
 * properties specify exactly what kind of string comparison is to be 
 * done.
 */

// The supported properties are these:
/**
 * usage: This property specifies how the collator object is to be used. 
 * The default value is "sort", but you can also specify "search".
 * The idea is that, when sorting strings, you typically want a collator
 * that differentiates as many strings as possible to produce a reliable
 * ordering. But when comparing two strings, some locales may want
 * a less strict comparison that ignores accents, for example.
 * 
 * sensitivity: This property specifies whether the collator is sensitive 
 * to letter case and accents when comparing strings. The value "base"
 * causes comparisons that ignore case and accents, considering only
 * the base letter for each character. (Note, however, that some
 * languages consider certain accented characters to be distinct base
 * letters.) "accent" considers accents in comparisons but ignores
 * case. "case" considers case and ignores accents. And "variant"
 * performs strict comparisons that consider both case and accents. The
 * default value for this property is "variant" when usage is "sort". If
 * usage is "search", then the default sensitivity depends on the locale.
 * 
 * ignorePunctuation: Set this property to true to ignore spaces and
 * punctuation when comparing strings. With this property set to true, 
 * the strings “any one” and “anyone”, for example, will be considered 
 * equal.
 * 
 * numeric: Set this property to true if the strings you are comparing are
 * integers or contain integers and you want them to be sorted into
 * numerical order instead of alphabetical order. With this option set,
 * the string “Version 9” will be sorted before “Version 10”, for example.
 * 
 * caseFirst: This property specifies which letter case should come 
 * first. If you specify "upper", then “A” will sort before “a”. And if 
 * you specify "lower", then “a” will sort before “A”. In either case, 
 * note that the upper- and lowercase variants of the same letter will be 
 * next to one another in sort order, which is different than Unicode 
 * lexicographic ordering (the default behavior of the Array sort() 
 * method) in which all ASCII uppercase letters come before all ASCII 
 * lowercase letters. The default for this property is locale dependent, 
 * and implementations may ignore this property and not allow you to 
 * override the case sort order.
 */

/**
 * Once you have created an Intl.Collator object for the desired locale 
 * and options, you can use its compare() method to compare two strings. 
 * This method returns a number. If the returned value is less than zero,
 * then the first string comes before the second string. If it is greater 
 * than zero, then the first string comes after the second string. And if
 * compare() returns zero, then the two strings are equal as far as this
 * collator is concerned.
 * This compare() method that takes two strings and returns a number
 * less than, equal to, or greater than zero is exactly what the Array
 * sort() method expects for its optional argument. Also, Intl.Collator
 * automatically binds the compare() method to its instance, so you
 * can pass it directly to sort() without having to write a wrapper
 * function and invoke it through the collator object.
 */

// Here are some examples:

// A basic comparator for sorting in the user's locale.
// Never sort human-readable strings without passing something like this:
const collator = new Intl.Collator().compare;
console.log(["a", "z", "A", "Z"].sort(collator)); // => a", "A", "z", "Z"]

// Filenames often includes numbers, so we should sort those specially
const filenameOrder = new Intl.Collator(undefined, { numeric: true }).compare;
console.log(["page10", "page9"].sort(filenameOrder));

// Find all strings that loosely match a target string
const fuzzyMatcher = new Intl.Collator(undefined, {
    sensitivity: "base",
    ignorePunctuation: true
}).compare;
let strings = ["food", "fool", "Føø Bar"];
console.log(strings.findIndex(s => fuzzyMatcher(s, "foobar") === 0)) // => 2

/**
 * Some locales have more than one possible collation order. In Germany, 
 * for example, phone books use a slightly more phonetic sort order than
 * dictionaries do. In Spain, before 1994, “ch” and “ll” were treated as
 * separate letters, so that country now has a modern sort order and a
 * traditional sort order. And in China, collation order can be based on
 * character encodings, the base radical and strokes of each character, or
 * on the Pinyin romanization of characters. These collation variants
 * cannot be selected through the Intl.Collator options argument, but they
 * can be selected by adding -u-co- to the locale string and adding the
 * name of the desired variant. Use "de-DE-u-co-phonebk" for
 * phone book ordering in Germany, for example, and "zh-TW-u-copinyin"
 * for Pinyin ordering in Taiwan.
 */

// Before 1994,  CH and LL were treated as separate letters in Spain
const modernSpanish = new Intl.Collator("es-ES").compare;
const traditionalSpanish =  Intl.Collator("es-ES-u-co-trad").compare;
let palabras = ["luz", "llama", "como", "chico"];
console.log(palabras.sort(modernSpanish)); // => ["chico", "como", "llama", "luz"]
console.log(palabras.sort(traditionalSpanish)); // => ["como", "chico", "luz", "llama"]