// Example 8-2. Private property accessor methods using closures
// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.

function addPrivateProperty(o, name, predicate) {
    let value; // This is the property value

    // The getter method simply returns the value.
    o[`get${name}`] = function() { return value; };

    // The setter method stores the value or throws an excepction if 
    // the predicate rejects the value.
    o[`set${name}`] = function(v) {
        if (predicate && !predicate(v)) {
            throw new TypeError(`set${name}: invalid value ${v}`);
        } else {
            value = v;
        }
    };
}

//  The following code demostrates the addPrivateProperty() method.
let o = {}; // Here is an empty object

// Add property accessor methods getName and setname()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", x => typeof x === "string");

o.setName("Frank"); // Set the property value
console.log(o.getName()); // => "Frank"
o.setName("Java Script"); 
console.log(o.getName()); // => "Java Script"

// This function returns a function that always returns v 
function constfunc(v) { return () => v; }

// Create an array of constant functions:
let funcs = [];
for(var i = 0; i < 10; i ++) funcs[i] = constfunc(i);

// The function at array element 5 returns the value 5.
console.log(funcs[5]());  // => 5

// Return an array of functions that return the values 0-9
function constfuncs() {
    let funcs = [];
    for(var i = 0; i < 10; i++) {
        funcs[i] = () => i;
    }
    return funcs;
}

let func = constfuncs();
console.log(func[5]()); // => 10; Why doesn't this return 5?
console.log(func[8]());