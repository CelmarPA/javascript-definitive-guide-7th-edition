let a = [1,2,3,4,5];
a.copyWithin(1); // => [1,1,2,3,4]: copy array elements up one
console.log(a);
a.copyWithin(2, 3, 5); // => [1,1,3,4,4]: copy last 2 elements to index 2
console.log(a);
a.copyWithin(0, -2); // => [4,4,3,4,4]: negative offsets work, too
console.log(a)