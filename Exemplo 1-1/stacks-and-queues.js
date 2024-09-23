let stack = []; // stack == []
stack.push(1,2); // stack == [1,2]
stack.pop(); // stack == [1]; returns 2
stack.push(3); // stack == [1,3]
stack.pop(); // stack == [1], returns 3
stack.push([4,5]); // stack == [1,[4,5]]
stack.pop(); // stack == [1], returns [4,5]
stack.pop(); // stack == [], returns 1

let q = []; // q == []
q.push(1,2); // q == [1,2]
q.shift(); // q == [2], returns 1
q.push(3); // q == [2, 3]
q.shift() // q == [3]; returns 2
q.shift() // q == []; returns 3

let a = []; // a == []
a.unshift(1); // a == [1]
a.unshift(2); // a == [2, 1]
a = []; // a == []
a.unshift(1,2); // a == [1, 2]