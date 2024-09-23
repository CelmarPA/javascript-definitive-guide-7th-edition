/**
 * One of the reasons that some projects use linters is to enforce a
 * consistent coding style so that when a team of programmers is working
 * on a shared codebase, they use compatible code conventions. This
 * includes code indentation rules, but can also include things like what
 * kind of quotation marks are preferred and whether there should be a
 * space between the for keyword and the open parenthesis that follows it.
 *
 * A modern alternative to enforcing code formatting rules via a linter
 * is to adopt a tool like Prettier to automatically parse and reformat
 * all of your code.
 *
 * Suppose you have written the following function, which works, but is
 * formatted unconventionally:
 */

function factorial(x)
{
if(x===1){return 1}
else{return x*factorial(x-1)}
}

/**
 * Running Prettier on this code fixes the indentation, adds missing 
 * semicolons, adds spaces around binary operators and inserts line 
 * breaks after { and before }, resulting in much more 
 * conventional-looking code:
 * 
 * $ prettier factorial.js
 * function factorial(x) {
 *   if (x === 1) {
 *     return 1;
 *   } else {
 *     return x * factorial(x - 1);
 *   }
 * }
 * 
 * If you invoke Prettier with the --write option, it will simply
 * reformat the specified file in place rather than printing a
 * reformatted version. If you use git to manage your source code, you
 * can invoke Prettier with the --write option in a commit hook so that 
 * code is automatically formatted before being checked in.
 * 
 * Prettier is particularly powerful if you configure your code editor to 
 * run it automatically every time you save a file.
 * 
 * Prettier is configurable, but it only has a few options. You can 
 * select the maximum line length, the indentation amount, whether 
 * semicolons should be used, whether strings should be single- or 
 * double-quoted, and a few other things. In general, Prettier’s default 
 * options are quite reasonable. The idea is that you just adopt Prettier 
 * for your project and then never have to think about code formatting 
 * again.
 */