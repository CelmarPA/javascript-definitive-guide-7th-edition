let a = [0,1,2,1,0];
console.log(a.indexOf(1)); // => 1: a[1] is 1
console.log(a.lastIndexOf(1)); // => 3: a[3] is 1
console.log(a.indexOf(3)); // => -1: no element has value 3

// Find all occurrences of a value x in an array a and return an array of matching indexes
function findall(a, x) {
    let results = [], // The array of indexes we'll return
    len = a.length, // The length of the array to be searched
    pos = 0; // The position to search from
    while(pos < len) { // While more elements to search...
        pos = a.indexOf(x, pos); // Search
        if (pos === -1) break; // If nothing found, we're done.
        results.push(pos); // Otherwise, store index in array
        pos = pos +1; // And start the next search at next element
    }
    return results; // Return array of indexes
}

console.log(findall(a, 1));

function findElements(a, v) {
    let  indexes = [], pos = 0;
    while(pos < a.length) {
        pos = a.indexOf(v, pos);
        if (pos === -1) break;
        indexes.push(pos);
        pos++
    }
    return indexes;
}
console.log(findElements(a, 1));