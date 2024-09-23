/**
 * The for/of loop and spread operator work seamlessly with iterable 
 * objects, but it is worth understanding what is actually happening to 
 * make the iteration work. There are three separate types that you need 
 * to understand to understand iteration in JavaScript. First, there are 
 * the iterable objects: these are types like Array, Set, and Map that 
 * can be iterated. Second, there is the iterator object itself, which 
 * performs the iteration. And third, there is the iteration result 
 * object that holds the result of each step of the iteration.
 */

/**
 * An iterable object is any object with a special iterator method that 
 * returns an iterator object. An iterator is any object with a next() 
 * method that returns an iteration result object. And an iteration 
 * result object is an object with properties named value and done. To 
 * iteratean iterable object, you first call its iterator method to get 
 * an iterator object. Then, you call the next() method of the iterator 
 * object repeatedly until the returned value has its done property set 
 * to true. The tricky thing about this is that the iterator method of an 
 * iterable object does not have a conventional name but uses the Symbol 
 * Symbol.iterator as its name. So a simple for/of loop over an iterable 
 * object iterable could also be written the hard way, like this:
 */

let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for(let result = iterator.next(); !result.done; result = 
iterator.next()) {
    console.log(result.value) // result.value == 99
}

/**
 * The iterator object of the built-in iterable datatypes is itself 
 * iterable. (That is, it has a method named Symbol.iterator that just 
 * returns itself.) This is occasionally useful in code like the 
 * following when you want to iterate though a “partially used” iterator:
 */

let list = [1,2,3,4,5];
let iter = list[Symbol.iterator]();
let head = iter.next().value; // head == 1
let tail = [...iter]; // tail == [2,3,4,5]
console.log(head); 
console.log(tail);