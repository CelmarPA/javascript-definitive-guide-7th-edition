const sum = (x, y) => { return x + y };
console.log(sum(5, 5));

const s = (x, y) => x + y;
console.log(s(5, 5));

const polynominal = x => x*x + 2*x + 3;
console.log(polynominal(2));

const constatFunc = () => 42;
console.log(constatFunc());

const f = x => { return {value: x};  }; // Good: f() returns an object
const g = x => ({value: x }); // Good: g() returns an object
const h = x => { value: x}; // Bad: h() returns nothing;
//const i = x => { v: x, w: x}; // Bad: Syntax Error

// Make a copy of an array with null elements removed.
let filtered = [1, null,2,3].filter(x => x !== null); // foltered == [1,2,3]
console.log(filtered);

// Square some numbers:
let squares = [1,2,3,4].map(x => x*x); // squares == [1,4,9,16]
console.log(squares);