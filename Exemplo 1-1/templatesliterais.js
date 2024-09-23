let s = `hello, world`;

let name = "Bill";
let greeting = `Hello ${name}.`; // greeting == "Hello Bill."

console.log(greeting);

/*let errorMessage = `\
\u2718 Test failure at &{filename}: ${linenumber}:
${exception.message}
Stack trace:
${exception.stack}
`;*/

console.log(`\n`.length); // => 1: a string tem um único caracter de nova linha
console.log(String.raw`\n`.length); // => 2: contém uma contrabarra e um letra n 