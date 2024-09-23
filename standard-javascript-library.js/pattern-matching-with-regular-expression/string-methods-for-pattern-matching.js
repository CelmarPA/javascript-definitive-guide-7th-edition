// SEARCH()
// Strings support four methods that use regular expressions. The simplest is search().

console.log("JavaScript".search(/script/ui)); // => 4
console.log("Python".search(/script/ui)) // => -1

/**
 * If the argument to search() is not a regular expression, it is first
 * converted to one by passing it to the RegExp constructor. search()
 * does not support global searches; it ignores the g flag of its regular
 * expression argument.
 */

// REPLACE()
/**
 * The replace() method performs a search-and-replace operation. It
 * takes a regular expression as its first argument and a replacement
 * string as its second argument. It searches the string on which it is 
 * called for matches with the specified pattern. If the regular 
 * expression has the g flag set, the replace() method replaces all 
 * matches in the string with the replacement string; otherwise, it 
 * replaces only the first match it finds.
 */

// No matter how it is capitalized, replace it with the correct captalization
let text = "javasCripT: The Definitive Guide!"
capt = text.replace(/javascript/gi, "JavaScript");
console.log(capt);

// A quote is a quotation mark, followed by any number of
// nonquotation mark characters (which we capture), followed
// by another quotation mark.
let quote = /"([^"]*)"/g;
// Replace the straight quotation marks with guillemets
// leaving the quoted text (stored in $1) unchanged.
let rep = 'He said "stop"'.replace(quote, '«$1»'); // => 'He said  <<stop>>'
console.log(rep);

// If your RegExp uses named capture groups, then you can refer to the
// matching text by name rather than by number:
let quote1 = /"(?<quotedText>[^"]*)"/g;
let rep1 = 'He said "stop"'.replace(quote1, '«$<quotedText>»');
console.log(rep1);

// Here is code that uses a replacement function to convert decimal // integers in a string to hexadecimal:
let s = "15 times 15 is 225";
let rep2 = s.replace(/\d+/gu, n => parseInt(n).toString(16)); // => "f times f is e1"
console.log(rep2);

// MATCH()
/**
 * The match() method is the most general of the String regular
 * expression methods. It takes a regular expression as its only argument
 * (or converts its argument to a regular expression by passing it to the
 * RegExp() constructor) and returns an array that contains the results
 * of the match, or null if no match is found. If the regular expression
 * has the g flag set, the method returns an array of all matches that
 * appear in the string. For example:
 */

let m = "7 plus 8 equals 15".match(/\d+/); // => ["7", "8", "15"]
console.log(m);

/**
 * If the regular expression does not have the g flag set, match() does
 * not do a global search; it simply searches for the first match. In this
 * nonglobal case, match() still returns an array, but the array elements
 * are completely different. Without the g flag, the first element of the
 * returned array is the matching string, and any remaining elements are
 * the substrings matching the parenthesized capturing groups of the
 * regular expression.
 * Thus, if match() returns an array a, a[0] contains the complete match,
 * a[1] contains the substring that matched the first parenthesized 
 * expression, and so on. To draw a parallel with the replace() method, 
 * [1] is the same string as $1, a[2] is the same as $2, and so on.
 */

// For example, consider parsing a URL whit the following code:

// A very simple URL parsing RegExp
let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text1 = "Visit my blog at http://www.example.com/~david";
let match = text1.match(url);
let fullurl, protocol, host, path;
if (match !== null) {
    fullurl = match[0]; // fullurl == "http://www.example.com/~david"
    protocol = match[1]; // protocol == "http"
    host = match[2]; // host == "www.example.com"
    path = match[3]; // path == "~david"
}
console.log(`The full URL is: ${fullurl}`);
console.log(`The protocol is: ${protocol}`);
console.log(`The host is: ${host}`);
console.log(`The path is: ${path}`);

// We could rewrite the previous URL parsing example, for example, like this:
let url1 = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
let text2 = "Visit my blog at http://www.example.com/~david"
let mat = text2.match(url1);
console.log(mat[0]); // => "http://www.example.com/~david"
console.log(mat.input); // => text
console.log(mat.index); // => 17
console.log(mat.groups.protocol); // => "http"
console.log(mat.groups.host); // => "www.example.com"
console.log(mat.groups.path); // => "~david"

/**
 * If a RegExp has both the g and y flags set, then match() returns an
 * array of matched strings, just as it does when g is set without y. But 
 * the first match must begin at the start of the string, and each 
 * subsequent match must begin at the character immediately following the 
 * previous match.
 * If the y flag is set without g, then match() tries to find a single
 * match, and, by default, this match is constrained to the start of the
 * string.
 */

let vowel = /[a,e,i,o,u]/y; // Sticky vowel match
"test".match(vowel) // null: "test" does not begin with a vowel
vowel.lastIndex = 1; // Specify a different match position
"test".match(vowel)[0]; // => "e": we found a viwel at position 1
vowel.lastIndex; // => 2: lastIndex was automatically updated
"test".match(vowel); // => null: no vowel at position 2
vowel.lastIndex; // => 0: lastIndex gets reset after failed match

// MATCHALL()
/**
 * matchAll() expects a RegExp with the g flag set. Instead of returning 
 * an array of matching substrings like match() does, however, it returns 
 * an iterator that yields the kind of match objects that match() returns 
 * when used with a non-global RegExp. This makes matchAll() the easiest 
 * and most general way to loop through all matches within a string.
 */

// You might use matchAll() to loop through the words in a string of text like this:

// One or more Unicode alphabetic characters between word boundaries
const words = /\b\p{Alphabetic}+\b/gu; // \p is not supported in Firefox yet
const t = "This is a naïve test of the matchAll() method";
for(let word of t.matchAll(words)) {
    console.log(`Found '${word[0]}' at index ${word.index}.`);
}

// SPLIT()
/**
 * The last of the regular expression methods of the String object is
 * split(). This method breaks the string on which it is called into an
 * array of substrings, using the argument as a separator. It can be used
 * with a string argument like this:
 */
let split = "123,456,789".split(","); // => ["123", "456", "789"]
console.log(split);

/**
 * The split() method can also take a regular expression as its
 * argument, and this allows you to specify more general separators. Here
 * we call it with a separator that includes an arbitrary amount of
 * whitespace on either side:
 */
let split1 = "1, 2, 3, \n4, 5".split(/\s*,\s*/); // => ["1", "2", "3", "4", "5"]
console.log(split1);

/**
 * Surprisingly, if you call split() with a RegExp delimiter and the
 * regular expression includes capturing groups, then the text that
 * matches the capturing groups will be included in the returned array. 
 * For example:
 */
const htmlTag = /<([^>]+)>/; // followed by one or more non->, followed by >
let testing = "Testing<br/>1,2,3".split(htmlTag); // => ["Testing", "br/", "1,2,3"]
console.log(testing);