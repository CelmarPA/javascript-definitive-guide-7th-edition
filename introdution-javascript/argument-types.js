// Return the sum of the elements an iterable object a.
// The elements of a must all be numbers.
function sum(a) {
    let total = 0;
    for(let element of a) { // Throws TypeError if a is not iterable
        if (typeof element !== "number") {
            throw new TypeError("sum(): elements must be numbers");
        }
        total += element;
    }
    return total;
}
console.log(sum([1,2,3])); // => 6
//console.log(sum(1,2,3)); // !TypeError: 1 is not iterable
//console.log(sum([1,2,"3"])); // !TypeError: element 2 is not a number