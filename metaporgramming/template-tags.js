/**
 * When an expression whose value is a function is followed by a template 
 * literal, it turns into a function invocation, and we call it a “tagged 
 * template literal.” Defining a new tag function for use with tagged 
 * template literals can be thought of as metaprogramming, because tagged 
 * templates are often used to define DSLs—domain-specific languages—and 
 * defining a new tag function is like adding new syntax to JavaScript. 
 * Tagged template literals have been adopted by a number of frontend 
 * JavaScript packages. The GraphQL query language uses a gql`` tag 
 * function to allow queries to be embedded within JavaScript code. And 
 * the Emotion library uses a css`` tag function to enable CSS styles to 
 * be embedded in JavaScript. This section demonstrates how to write your 
 * own tag functions like these.
 * 
 * There is nothing special about tag functions: they are ordinary 
 * JavaScript functions, and no special syntax is required to define 
 * them. When a function expression is followed by a template literal, 
 * the function is invoked. The first argument is an array of strings, 
 * and this is followed by zero or more additional arguments, which can 
 * have values of any type.
 * 
 * The number of arguments depends on the number of values that are
 * interpolated into the template literal. If the template literal is  
 * simply a  constant string with no interpolations, then the tag 
 * function will be called with an array of that one string and no 
 * additional arguments. If the template literal includes one 
 * interpolated value, then the tag function is called with two 
 * arguments. The first is an array of two strings, and the second is the 
 * interpolated value. The strings in that initial array are the string 
 * to the left of the interpolated value and the  string to its right, 
 * and either one of them may be the empty string. If the template 
 * literal includes two interpolated values, then the tag function is 
 * invoked with three arguments: an array of three strings and the two 
 * interpolated values. The three strings (any or all of which may be 
 * empty) are the text to the left of the first value, the text between 
 * the two values, and the text to the right of the second value. In the 
 * general case, if the template literal has n interpolated values, then 
 * the tag function will be invoked with n+1 arguments. The first 
 * argument will be an array of n+1 strings, and the remaining arguments 
 * are the n interpolated values, in the order that they appear in the 
 * template literal.
 * 
 * The value of a template literal is always a string. But the value of a 
 * tagged template literal is whatever value the tag function returns. 
 * This may be a string, but when the tag function is used to implement a 
 * DSL, the return value is typically a non-string data structure that is 
 * a parsed representation of the string.
 * 
 * As an example of a template tag function that returns a string, 
 * consider the following html`` template, which is useful when you want 
 * to safely interpolate values into a string of HTML. The tag performs 
 * HTML escaping on each of the values before using it to build the final 
 * string:
 */

function html(strings, ...values) {
    // Convert each value to a string and escape special HTML characters
    let escaped = values.map(v => String(v)
                                  .replace("&", "&amp;")
                                  .replace("<", "&lt;")
                                  .replace(">", "&gt;")
                                  .replace('"', "&quot;")
                                  .replace("'", "&#39;"));
    
    // Return the concatenated strings and escapes values
    let result = strings[0];
    for(let i = 0; i < escaped.length; i++) {
        result += escaped[i] + strings[i+1];
    }
    return result;
}

let operator = "<";
html`<b>x ${operator} y</b>` // => "<b>x &lt; y</b>" 

let kind = "game", name = "D&D";
html`<div class="${kind}">${name}</div>` // => =>'<div class="game">D&amp;D</div>'

/**
 * For an example of a tag function that does not return a string but 
 * instead a parsed representation of a string, think back to the Glob 
 * pattern class. Since the Glob() constructor takes a single string 
 * argument, we can define a tag function for creating new Glob objects:
 */

class Glob {
    constructor(glob) {
        this.glob = glob;

        // We implement glob matching using RegExp internally.
        // ? matches any one character except /, and * matches zero or more
        // of those characters. We use capturing groups araound each.

        let regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");

        // We use the u flag to get Unicode-aware matching.
        // Globs are intended to match entire strings, so we use the ^and $
        // anchors and do not implement search() or matchAll() since they
        // are not useful with partterns like this.
        this.regexp = new RegExp(`^${regexpText}$`, "u");
    }

    toString() { return this.glob; }
    [Symbol.search](s) { return s.search(this.regexp); }
    [Symbol.match](s) { return s.match(this.regexp); }
    [Symbol.replace](s, replacement) {
        return s.replace(this.regexp, replacement);
    }
}

function glob(strings, ...values) {
    // Assemble the strings and values into a single string
    let s = strings[0];
    for(let i = 0; i < values.length; i++) {
        s += values[i] + strings[i+1];
    }
    // Return a parsed representation of that string
    return new Glob(s);
}

let root = "/tmp";
let filePattern = glob`${root}/*.html`; // A RegExp alternative
console.log("/tmp/test.html".match(filePattern)[1]) // => "test"