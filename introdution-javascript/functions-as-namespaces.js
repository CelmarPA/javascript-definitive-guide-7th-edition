function chunkNamespace() {
    // Chunk of code  goes here
    // Any variables defined in the chunk are local to this function
    // instead of cluttering up the global namespace.
}
chunkNamespace(); // But don't forget to invoke the function"!

(function() { // chunkNamespace() function rewritten as an unnamed expression.
    // Chunk of code goes here

}()); // End the function literal and invoke it now.