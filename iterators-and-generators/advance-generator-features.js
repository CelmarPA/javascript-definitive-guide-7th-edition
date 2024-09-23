// The Return Value of a Generator Function

/**
 * The generator functions we’ve seen so far have not had return 
 * statements, or if they have, they have been used to cause an early 
 * return, not to return a value. Like any function, though, a generator 
 * function can return a value. In order to understand what happens in 
 * this case, recall how iteration works. The return value of the next() 
 * function is an object that has a value property and/or a done 
 * property. With typical iterators and generators, if the value property 
 * is defined, then the done property is undefined or is false. And if 
 * done is true, then value is undefined. But in the case of a generator 
 * that returns a value, the final call to next returns an object that 
 * has both value and done defined. The value property holds the return 
 * value of the generator function, and the done property is true, 
 * indicating that there are no more values to iterate. This final value 
 * is ignored by the for/of loop and by the spread operator, but it is 
 * available to code that manually iterates with explicit calls to next():
 */

function *oneAndDone() {
    yield 1;
    return "done";
}

// The return value does not appear in normal iteration.
console.log([...oneAndDone()]); // => [1]

// But it is available if you explicity call next()
let generator = oneAndDone();
console.log(generator.next()); // => { value: 1,  done: false }
console.log(generator.next()); // => { value: "done", done: true }

// If the generator is already done, the return value is not returned again
console.log(generator.next()); // => { value: undefined, done: true }

// The Value of a yield Expression

/**
 * When the next() method of a generator is invoked, the generator 
 * function runs until it reaches a yield expression. The expression that 
 * follows the yield keyword is evaluated, and that value becomes the 
 * return value of the next() invocation. At this point, the generator 
 * function stops executing right in the middle of evaluating the yield 
 * expression. The next time the next() method of the generator is 
 * called, the argument passed to next() becomes the value of the yield 
 * expression that was paused. So the generator returns values to its 
 * caller with yield, and the caller passes values in to the generator 
 * with next(). The generator and caller are two separate streams of 
 * execution passing values (and control) back and forth. The following 
 * code illustrates:
 */

function* smallNumbers() {
    console.log("next() invoked the first time; argument discarted");
    let y1 =  yield 1; // y1 == "b"
    console.log("next() invoked a second time with argument", y1);
    let y2 = yield 2; // y2 == "c"
    console.log("next() invoked a third time with argumnent",  y2);
    let y3 = yield 3; // y3 == "d"
    console.log("next() invoked a fourth time with argument", y3);
    return 4;
}

let g = smallNumbers();
console.log("generator created; no code runs yet");
let n1 = g.next("a"); // n1.value == 1
console.log("generator yielded", n1.value);
let n2 = g.next("b"); // n2.value == 2
console.log("generator yielded", n2.value);
let n3 = g.next("c"); // n3.value == 3
console.log("generator yielded", n3.value);
let n4 = g.next("d"); // n4 == { value: 4, done: true }
console.log("generator returned", n4.value);

/**
 * When this code runs, it produces the following output that 
 * demonstrates the back-and-forth between the two blocks of code:
 * 
 *      generator created; no code runs yet 
 *      next() invoked the first time; argument discarded
 *      generator yielded 1
 *      next() invoked a second time with argument b
 *      generator yielded 2
 *      next() invoked a third time with argument c
 *      generator yielded 3
 *      next() invoked a fourth time with argument d
 *      generator returned 4
 * 
 * Note the asymmetry in this code. The first invocation of next() starts 
 * the generator, but th
 */

// The return() and throw() Methods of a Generator