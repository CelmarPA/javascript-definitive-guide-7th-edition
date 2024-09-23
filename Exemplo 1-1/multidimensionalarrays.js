// Create a multidimensional array
let table = new Array(10); // 10 rows of the table
for(let i = 0; i < table.length; i++) {
    table[i] = new Array(10); // Each row has 10 columns 
}

// Initialize the array
for(let row = 0; row < table.length; row++) {
    for(let col = 0; col <  table[row].length; col ++) {
        table[row][col] = row * col;
    }
}

// Use the multidimensional array to compute 5 * 7
console.log(table[5][7]); // => 35
