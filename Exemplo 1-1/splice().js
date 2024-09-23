let a = [1,2,3,4,5,6,7,8];
console.log(a.splice(4)); // => [5,6,7,8]; a is now [1,2,3,4]
console.log(a);
console.log(a.splice(1,2)); // => [2,3]; a is now [1, 4]
console.log(a);
console.log(a.splice(1,1)); // => [4]; a is now [1]
console.log(a);

let a1 = [1,2,3,4,5];
console.log(a1.splice(2,0,"a","b")); // => []; a is now [1,2,"a","b",3,4,5]
console.log(a1);
console.log(a1.splice(2,2,[1,2],3)); //["a","b"]; a is now [1,2,[1,2],3,3,4,5]
console.log(a1);