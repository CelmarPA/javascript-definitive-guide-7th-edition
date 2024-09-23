let F = function() {}; // This is a function object.
let p = F.prototype; //  This is the prototype object associated with F.
let c = p.constructor; // This is the function associated with the prototype.
console.log(c === F); // => true: F.prototype.constructor === F for any F

let o = new F(); // Create an object o of class F
console.log(o.constructor === F); // => true: the constructor property specifies the class