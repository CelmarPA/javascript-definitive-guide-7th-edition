let a = [1,2,3,4,5];
b = a.every(x => x < 10); // true: all values are < 10.
console.log(b);
c = a.every(x => x % 2 === 0); // false: not all values are even.
console.log(c);

d = a.some(x => x % 2 === 0); // true; a has some even numbers.
console.log(d);
e = a.some(isNaN) // false; a has no non-numbers.
console.log(e);