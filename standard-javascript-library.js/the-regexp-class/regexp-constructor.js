/**
 * The RegExp() constructor takes one or two string arguments and
 * creates a new RegExp object. The first argument to this constructor is
 * a string that contains the body of the regular expression—the text that
 * would appear within slashes in a regular-expression literal. Note that
 * both string literals and regular expressions use the \ character for
 * escape sequences, so when you pass a regular expression to
 * RegExp() as a string literal, you must replace each \ character with
 * \\. The second argument to RegExp() is optional. If supplied, it
 * indicates the regular expression flags. It should be g, i, m, s, u, y
 * or any combination of those letters.
 */

// For example:

// Find all five-digit number in a string. Note the double \\ in this case.
let zipcode = new RegExp("\\d{5", "g");

/**
 * Instead of passing a string as the first argument to RegExp(), you can
 * also pass a RegExp object. This allows you to copy a regular
 * expression and change its flags:
 */
let exactMatch = /JavaScript/;
let caseInsensitive = new RegExp(exactMatch, "i");

// REGEXP PROPERTIES

/**
 * RegExp objects have the following properties:
 * 
 * source: This read-only property is the source text of the regular 
 * expression: the characters that appear between the slashes in a RegExp 
 * literal.
 * 
 * flags: This read-only property is a string that specifies the set of
 * letters that represent the flags for the RegExp.
 * 
 * global: A read-only boolean property that is true if the g flag is set.
 * 
 * ignoreCase: A read-only boolean property that is true if the i flag is 
 * set.
 * 
 * multiline: A read-only boolean property that is true if the m flag is 
 * set.
 * 
 * dotAll: A read-only boolean property that is true if the s flag is set.
 * 
 * unicode: A read-only boolean property that is true if the u flag is 
 * set.
 * 
 * sticky: A read-only boolean property that is true if the y flag is set.
 * 
 * lastIndex: This property is a read/write integer. For patterns with 
 * the g or y flags, it specifies the character position at which the 
 *  next search is to begin. It is used by the exec() and test() methods.
 */

// TEST()

/**
 * The test() method of the RegExp class is the simplest way to use a
 * regular expression. It takes a single string argument and returns true
 * if the string matches the pattern or false if it does not match.
 * test() works by simply calling the (much more complicated)
 * exec() method described in the next section and returning true if
 * exec() returns a non-null value. Because of this, if you use test()
 * with a RegExp that uses the g or y flags, then its behavior depends on
 * the value of the lastIndex property of the RegExp object, which
 * can change unexpectedly.
 */

// EXEC()

/**
 * The RegExp exec() method is the most general and powerful way to
 * use regular expressions. It takes a single string argument and looks
 * for a match in that string. If no match is found, it returns null. If 
 * a match is found, however, it returns an array just like the array 
 * returned by the match() method for non-global searches. Element 0 of 
 * the array contains the string that matched the regular expression, and 
 * any subsequent array elements contain the substrings that matched any 
 * capturing groups. The returned array also has named properties: the
 * index property contains the character position at which the match
 * occurred, and the input property specifies the string that was
 * searched, and the groups property, if defined, refers to an object that
 * holds the substrings matching the any named capturing groups.
 */

// For example, the loop in the following code will run twice:
let  pattern = /Java/g;
let text =  "JavaScrpit > Java";
let match;
while((match = pattern.exec(text)) !== null) {
    console.log(`Matched ${match[0]} at ${match.index}`);
    console.log(`Next search begins at ${pattern.lastIndex}`);
}

// THE LASTINDEX PROPERTY AND REGEXP REUSE
/**
 * The use of the lastIndex property with the g and y flags is a 
 * particularly awkward part of the JavaScript's API. When you use
 * these flags, you need to be particularly careful when calling the match
 * (), exec(), or test() methods because the behavior of these methods 
 * depends on lastIndex, and the value of lastIndex depends on what you 
 * have previously done with the RegExp object. This makes it easy to
 * write buggy code.
 */

// Suppose, for example, that we wanted to find the index of all <p> tags 
// within a string of HTML text. We might write code like this:
let matchs, positions = [];
while((matchs = /<p>/g.exec(html)) !== null) { // Possible Infinite Loop
    positions.push(matchs.index)
}

/**
 * This code does not do what we want it to. If the html string contains ]
 * at least one <p> tag, then it will loop forever. The problem is that 
 * we use a RegExp literal in the while loop condition. For each 
 * iteration of the loop, we’re creating a new RegExp object with 
 * lastIndex set to 0, so exec() always begins at the start of the 
 * string, and if there is a match, it will keep matching over and over. 
 * The solution, of course, is to define the RegExp once, and save it to 
 * a variable so that we’re using the same RegExp object for each 
 * iteration of the loop.
 */

/**
 * On the other hand, sometimes reusing a RegExp object is the wrong 
 * thing to do. Suppose, for example, that we want to loop through all of 
 * the words in a dictionary to find words that contain pairs of double 
 * letters:
 */

let dictionary = [ "apple", "book", "coffee"];
let doubleLetterWords = [];
let doubleLetter = /(\w)\1/g;

for(let word of dictionary) {
    if (doubleLetter.test(word)) {
        doubleLetterWords.push(word);
    }
}
console.log(doubleLetterWords) // => ["apple", "coffee"]: "book" is missing!

/**
 * Because we set the g flag on the RegExp, the lastIndex property is 
 * changed after successful matches, and the test() method (which is 
 * based on exec()) starts searching for a match at the position 
 * specified by lastIndex. After matching the “pp” in “apple”, lastIndex 
 * is 3, and so we start searching the word “book” at position 3 and do 
 * not see the “oo” that it contains. We could fix this problem by 
 * removing the g flag (which is not actually necessary in this 
 * particular example), or by moving the RegExp literal into the body of 
 * the loop so that it is re-created on each iteration, or by explicitly 
 * resetting lastIndex to zero (doubleLetter.lastIndex = 0) before each 
 * call to test(). The moral here is that lastIndex makes the RegExp API 
 * error prone. So be extra  careful when using the g or y flags and 
 * looping. And in ES2020 and later, use the String matchAll() method 
 * instead of exec() to sidestep this problem since matchAll() does not 
 * modify lastIndex.
 */