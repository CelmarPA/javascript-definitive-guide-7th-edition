// Pattern Matching with Regular Expressions

/**
 * A regular expression is an object that describes a textual 
 * pattern. The JavaScript RegExp class represents regular 
 * expressions, and both String and RegExp define methods that use 
 * regular expressions to perform powerful pattern-matching and 
 * search-and-replace functions on text.
 */

// Defining Regular Expressions

/**
 * In JavaScript, regular expressions are represented by RegExp 
 * objects. RegExp objects may be created with the RegExp() 
 * constructor, of course, but they are more often created using a 
 * special literal syntax. Regular expression literals are 
 * specified as characters within a pair of slash (/) characters.
 */
let  pattern = /s$/;

// This regular expression could have equivalently been defined
// with the RegExp() constructor, like this:
let pattern1 = new RegExp("s$");

/**
 * Thus, the regular expression /java/ matches any string that
 * contains the substring “java”. Other characters in regular 
 * expressions are not matched literally but have special 
 * significance. For example, the regular expression /s$/ contains 
 * two characters. The first, “s”, matches itself literally. The 
 * second, “$”, is a special meta-character that matches the end of 
 * a string. Thus, this regular expression matches any string that 
 * contains the letter “s” as its last character.
 * As we’ll see, regular expressions can also have one or more flag
 * characters that affect how they work. Flags are specified
 * following the second slash character in RegExp literals, or as a 
 * second string argument to the RegExp() constructor.
 */

// If we wanted to match strings that end with “s” or “S”, for 
// example, we could use the i flag with our regular expression to 
// indicate that we want case-insensitive matching:
let pattern2 = /s$/i;

// Literal Characters:

/**
 * All alphabetic characters and digits match themselves literally 
 * in regular expressions. JavaScript regular expression syntax 
 * also supports certain nonalphabetic characters through escape 
 * sequences that begin with a backslash (\). For example, the 
 * sequence \n matches a literal newline character in a string.
 */

// Table 11-1. Regular-expression literal characters
/**
 * Character                        Matches
 * Alphanumeric character           Itself
 * \0                               The NUL character (\u0000)
 * \t                               Tab (\u0009)
 * \n                               Newline (\u000A)
 * \v                               Vertical tab (\u000B)
 * \f                               Form feed (\u000C)
 * \r                               Carriage return (\u000D)
 * 
 * \xnn                             The Latin character specified by the
 *                                  hexadecimal number nn for example,
 *                                  \x0A is the same as \n.
 * 
 * \uxxxx                           The Unicode character specified by
 *                                  the hexadecimal number xxxx; for
 *                                  example, \u0009 is the same as \t.
 * 
 * \u{n}                            The Unicode character specified by 
 *                                  the codepoint n, where n is one to six
 *                                  hexadecimal digits between 0 and
 *                                  10FFFF. Note that this syntax is only
 *                                  supported in regular expressions that
 *                                  use the u flag.
 * 
 * \cX                              The control character ^X; for
 *                                  example, \cJ is equivalent to the
 *                                  newline character \n. 
 */

// A number of punctuation characters have special meanings in regular 
// expressions. They are: ^ $ . * + ? = ! : | \ / ( ) [ ] { }

// Character Classes

/**
 * Individual literal characters can be combined into character classes by
 * placing them within square brackets. A character class matches any one
 * character that is contained within it. Thus, the regular expression
 * /[abc]/ matches any one of the letters a, b, or c.
 * Negated character classes can also be defined; these match any 
 * character except those contained within the brackets. A negated 
 * character class is specified by placing a caret (^) as the first 
 * character inside the left bracket. The RegExp /[^abc]/ matches any one 
 * character other than a, b, or c. Character classes can use a hyphen to 
 * indicate a range of characters. To match any one lowercase character 
 * from the Latin alphabet, use /[az]/, and to match any letter or digit 
 * from the Latin alphabet, use /[a-zA-Z0-9]/.
 */

// Table 11-2. Regular expression character classes
/**
 * Character                Matches
 * [...]                    Any one character between the brackets.
 * [^...]                   Any one character not between the brackets.
 * 
 * .                        Any character except newline or another 
 *                          Unicode line terminator. Or, if the
 *                          RegExp uses the s flag, then a period matches 
 *                          any character, including line terminators.
 * 
 * \w                       Any ASCII word character. Equivalent to 
 *                          [a-zA-Z0-9_].
 * 
 * \W                       Any character that is not an ASCII word 
 *                          character. Equivalent to [^a-zA-Z0-9_].
 * 
 * \s                       Any Unicode whitespace character.
 * \S                       Any character that is not Unicode whitespace.
 * \d                       Any ASCII digit. Equivalent to [0-9].
 * 
 * \D                       Any character other than an ASCII digit. 
 *                          Equivalent to [^0-9].
 * 
 * [\b]                     A literal backspace (special case).
*/

/**
 * Note that the special character-class escapes can be used within square
 * brackets. \s matches any whitespace character, and \d matches any
 * digit, so /[\s\d]/ matches any one whitespace character or digit.
 * Note that there is one special case. As you’ll see later, the \b escape
 * has a special meaning. When used within a character class, however, it
 * represents the backspace character. Thus, to represent a backspace
 * character literally in a regular expression, use the character class
 * with one element: /[\b]/.
 */

// Repetition

// Table 11-3. Regular expression repetition characters
/**
 * Character                Meaning
 * {n,m}                    Match the previous item at least n times but
 *                          no more than m times.
 * 
 * {n,}                     Match the previous item n or more times.
 * 
 * {n}                      Match exactly n occurrences of the previous 
 *                          item.
 * 
 * ?                        Match zero or one occurrences of the previous 
 *                          item. That is, the previous item is optional.
 *                          Equivalent to {0,1}.
 * 
 * +                        Match one or more occurrences of the previous 
 *                          item. Equivalent to {1,}.
 * 
 * *                        Match zero or more occurrences of the 
 *                          previous item. Equivalent to {0,}.
 */

// The following lines show some examples:
let r = /\d{2,4}/; //  Match betweem two and four digits
r = /\w{3}\d?/; // Match exactly three word characters and  an optional digit
r = /\s+java+\s+/; // Match "java" with one or more spaces before and after
r = /[^()]*/; // Match zero or more characters that are not open parens

// SPECIFYING MATCH POSITION

// Table 11-5. Regular expression anchor characters
/**
 * Character                    Meaning
 * ^                            Match the beginning of the string or, 
 *                              with the m flag, the beginning of a line.
 * 
 * $                            Match the end of the string and, with the 
 *                              m flag, the end of a line.
 * 
 * \b                           Match a word boundary. That is, match the 
 *                              position between a \w character and a \W 
 *                              character or between a \w character and 
 *                              the beginning or end of a string. (Note, 
 *                              however, that [\b] matches backspace.)
 * 
 * \B                           Match a position that is not a word 
 *                              boundary.
 * 
 * (?=p)                        A positive lookahead assertion. Require 
 *                              that the following characters match the 
 *                              pattern p, but do not include those 
 *                              characters in the match.
 * 
 * (?!p)                        A negative lookahead assertion. Require 
 *                              that the following characters do not 
 *                              match the pattern p.
 * 
 */

// FLAGS

/**
 * Flags are specified after the second / character of a regular 
 * expression literal or as a string passed as the second argument to the 
 * RegExp() constructor. Thesupported flags and their meanings are:
 * 
 * g: The g flag indicates that the regular expression is “global”—that 
 * is, that we intend to use it to find all matches within a string 
 * rather than just finding the first match.
 * 
 * i: The i flag specifies that pattern matching should be 
 * caseinsensitive.
 * 
 * m: The m flag specifies that matching should be done in “multiline”
 * mode.
 * 
 * s: Like the m flag, the s flag is also useful when working with text
 * that includes newlines. Normally, a “.” in a regular expression
 * matches any character except a line terminator. When the s flag is
 * used, however, “.” will match any character, including line 
 * terminators.
 * 
 * u: The u flag stands for Unicode, and it makes the regular expression
 * match full Unicode codepoints rather than matching 16-bit values.
 * 
 * y: The y flag indicates that the regular expression is “sticky” and
 * should match at the beginning of a string or at the first character
 * following the previous match.
 */