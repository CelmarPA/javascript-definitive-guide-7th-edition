let letters = [... "Hello world"]; // Um array de letras
let string = "";
for(let letter of letters) {
    string += letter;
}
console.log(string); // "Hello world"; nós reatribuimos o texto original

let everyother = "";
for(let [index, letter] of letters.entries()) {
    if (index % 2 == 0) everyother += letter; // letras a cada índice par
}
console.log(everyother); // => "Hlowrd"

let uppercase = "";
letters.forEach(letter => { // Note array function syntax here
    uppercase += letter.toUpperCase();
});
console.log(uppercase);

let vowels = "";
for(let i = 0; i < letters.length; i++) { // For each index in the array
    let letter = letters[i]; // Get the element at that index
    if (/[aeiou]/.test(letter)) { // Use regular expression test
        vowels += letter; // If it is a vowel, remenber it
    }
}
console.log(vowels); // => "eoo"

// Save the array length into a local variable
for(let i = 0, len = letters.length; i < len; i++) {
    // loop body remnains the same
}

// Iterate backwards from the end of the array to the start
for(let i = letters.length-1; i >= 0; i--) {
    // loop body remnains the same
}

for(let i = 0; i < a.length; i++) {
    if (a[i] === undefined) continue; // Skip undefined + nonexistent elements
    // loop body here
}