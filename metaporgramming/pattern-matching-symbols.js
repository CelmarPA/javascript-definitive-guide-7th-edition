/**
 * In ES6 and later, String methods that perform pattern-matching 
 * operations using a RegExp argument have been generalized to work with 
 * RegExp objects or any object that defines pattern-matching behavior 
 * via properties with symbolic names. For each of the string methods 
 * match(), matchAll(), search(), replace(), and split(), there is a 
 * corresponding well-known Symbol: Symbol.match, Symbol.search, and so 
 * on.
 * 
 * RegExps are a general and very powerful way to describe textual 
 * patterns, but they can be complicated and not well suited to fuzzy 
 * matching. With the generalized string methods, you can define your own 
 * pattern classes using the well-known Symbol methods to provide custom 
 * matching. For example, you could perform string comparisonsusing Intl.
 * Collator to ignore accents when matching. Or you could define a 
 * pattern class based on the Soundex algorithm to match words based on 
 * their approximate sounds or to loosely matchstrings up to a given 
 * Levenshtein distance.
 */

// In general, when you invoke one of these five String methods on a
// pattern object like this:

//  string.method(pattern, arg)

// that invocation turns into an invocation of a symbolically named
// method on your pattern object:

// pattern[symbol](string, arg)

/**
 * As an example, consider the pattern-matching class in the next 
 * example, which implements pattern matching using the simple * and ? 
 * wildcards that you are probably familar with from filesystems. This 
 * style of pattern matching dates back to the very early days of the 
 * Unix operating system, and the patterns are often called globs:
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
        this.regexpText = new RegExp(`^${regexpText}$`, "u");
    }

    toString() { return this.glob; }
    [Symbol.search](s) { return s.search(this.regexp); }
    [Symbol.match](s) { return s.match(this.regexp); }
    [Symbol.replace](s, replacement) {
        return s.replace(this.regexp, replacement);
    }
}

let pattern = new Glob("docs/*.txt");
"docs/js.text".search(pattern); // 0 => matches ar character 0
"docs/js.htm".search(pattern); // -1: does not match
let match = "docs/js.txt".match(pattern);
match[0] // => "docs/js.txt"
match[1] // => "js"
match.index // => 0
"docs/js.txt".replace(pattern, "web/$1.htm") // => "web/js.htm"