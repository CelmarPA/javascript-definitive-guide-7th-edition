// the arguments to this function are passed on the left
function partialLeft(f, ...outerArgs) {
    return function (...innerArgs) { // Return this function
        let args = [...outerArgs, ...innerArgs]; // Built the argument list
        return f.apply(this, args); // Then ivoke f with it
    };
}

// The arguments to this function are passed on the right
function partialRight(f, ...outerArgs) {
    return function(...innerArgs) { // Return this function
        let args = [...innerArgs, ...outerArgs]; // Built the argument list
        return f.apply(this, args); // The ivoke f with it
    };
}

// The argumenst to this function serve as a  template. Undefined values
// in the argument list are filled in with values from the inner set.
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs]; // local copy of outer args template
        let innerIndex = 0; // which inner arg is  next
        // Loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner argumetns
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}

// Here is a function with three arguments
const f = function(x,y,z) { return x * (y-z); };
// Notice how these three partial applications differ
console.log(partialLeft(f, 2)(3,4)); // => -2: Bind first argument: 2 * (3 - 4)
console.log(partialRight(f,2)(3,4)); // => 6: Bind lasr argument: 3 * (4 - 2)
console.log(partial(f, undefined, 2)(3,4)); // -6: Bind midlle argument: 3 * (2 - 4)

// Função sum:
const sum = (x,y) => x+y;
const increment = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1/3);
console.log(cuberoot(increment(26))); // => 3