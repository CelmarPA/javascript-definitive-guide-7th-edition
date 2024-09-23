/**
 * Sometimes, you may have JavaScript code that is not used when a 
 * document first loads and is only needed if the user takes some 
 * action like clicking on a button or opening a menu. If you are 
 * developing your code using modules, you can load a module on demand 
 * with import(). If you are not using modules, you can load a file of 
 * JavaScript on demand simply by adding a <script> tag to your 
 * document when you want the script to load:
 */

// Asynchronously load and execute a script from a specified URL
// Returns a Promise that resolves when the script has load.
function importScript(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement("script"); // Create a <script> element
        s.onload = () => { resolve(); }; // Resolve promise when load
        s.onerror = (e) => { reject(e); }; // Reject on failure
        s.src = url; // Set the script URL
        document.head.append(s); // Add <script> to document.
    });
}

/**
 * This importScript() function uses DOM APIs to create a new <script> 
 * tag and add it to the document <head>. And it uses event handlers 
 * to determine when the script has loaded successfully or when 
 * loading has failed.
 */