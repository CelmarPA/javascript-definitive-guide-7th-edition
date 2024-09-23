let scope = "global scope"; // A global variable
function checkscope() {
    let scope = "local scope"; // A local variable
    function f() { return scope; } // Return the value in scope here
    return f;
}
console.log(checkscope()); // => "local scope"
let s = checkscope()(); 
console.log(s)

let uniqueInteger = (function() { // Define and invoke
    let counter = 0; // Private state of function below
    return function() { return counter++; };

}());
console.log(uniqueInteger()); // => 0
console.log(uniqueInteger()); // => 1

function counter() {
    let n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0;}
    };
}

let c =  counter(), d = counter(); // Create two counters
console.log(c.count()); // => 0
console.log(d.count()); // => 0: they count independently
c.reset(); // reset() and count() methods share state
console.log(c.count()); // => 0: because we reset c
console.log(d.count()); // => 1: d was not reset

function counters(n) { // Function argument n is the private variable
    return {
        // Property getter method returns and increments private counter var.
        get count() { return n++; },
        // Property setter doesn't allow the valu of n to decrease
        set count(m) {
            if(m > n) n = m;
            else throw Error("count can only be set to a larger value");
        }
    };
}

let cont = counters(1000);
console.log(cont.count); // => 1000
console.log(cont.count); // => 1001
console.log(cont.count = 2000);
console.log(cont.count); // => 2000
console.log(cont.count = 2000); // !Error: count can only be set to a larger value