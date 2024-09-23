let calculator = { // An object literal
    operand1: 1,
    operand2: 1,
    add() { // We're using method shorthand syntax for this function
        // Note the use of the this keyword to refer to the containing object.
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add(); // A method invocation to compute 1+1
console.log(calculator.result); // => 2

let o = { // An object o.
    m: function() { //Method m of the objetct.
        let self = this; // Save the "this" value in a variable.
        this === o // => true: "this" is the  object o.
        f(); // Now call the helper function f().

        function f() { // A nested function f
            this === o // => false: "this" is global or undefined
            self === o // => true: self is the outer "this" value.
        }
    }
};
o.m(); // Invoke the method m on the object o.

const f1 = () => {
    this === o // true, since arrow functions inherit this
};

const f = (function() {
    this === 0 // true,  since we bound this function to the outer this
}).bind(this);