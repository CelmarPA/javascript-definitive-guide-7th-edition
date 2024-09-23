let a = [1,2,3,4,5];
b = a.findIndex(x => x === 3); // => 2; the value 3 appears at index 2
console.log(b);
c = a.findIndex(x => x < 0); // => -1; no negative numbers in the array
console.log(c);
d = a.find(x => x % 5 === 0); // => 5: this is a multiple of 5
console.log(d);
e = a.find(x => x % 7 === 0); // => undefined : no multiples of in the array
console.log(e);