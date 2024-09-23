/**
 * In programming, the term lint refers to code that, while technically
 * correct, is unsightly, or a possible bug, or suboptimal in some way. A
 * linter is a tool for detecting lint in your code, and linting is the
 * process of running a linter on your code (and then fixing your code to
 * remove the lint so that the linter no longer complains).
 *
 * The most commonly used linter for JavaScript today is ESLint. If you
 * run it and then take the time to actually fix the issues it points
 * out, it will make your code cleaner and less likely to have bugs.
 * Consider the following code:
 */

var x = "unused";

export function factorial(x) {
  if (x == 1) {
    return 1;
  } else {
    return x * factorial(x - 1);
  }
}

console.log(factorial(5));

/**
 * Linters can seem nitpicky sometimes. Does it really matter whether we
 * used double quotes or single quotes for our strings? On the other
 * hand, getting indentation right is important for readability, and
 * using === and let instead of == and var protects you from subtle bugs.
 * Andunused variables are dead weight in your code—there is no reason to
 * keep those around. ESLint defines many linting rules and has an
 * ecosystem of plug-ins that add many more. But ESLint is fully
 * configurable, and you can define a configuration file that tunes
 * ESLint to enforce exactly the rules you want and only those rules.
 */
