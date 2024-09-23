const modules = {};
function require(moduleName) { return modules[moduleName]; }

modules["sets.js"] = (function() {
    const exports = {}; 

    // The contents of the sets.js file go here:
    exports.BitSet = class BitSet { /*...*/ };

    return exports;
}());

modules["stats.js"] = (function() {
    const exports = {};

    // The contents of the stats.js gile go here:
    const sum = (x, y) => x + y;
    const square = x => x * x;
    exports.mean = function(data) { /* ... */};
    exports.stddv = function(data) { /* ... */};

    return exports;
}());

// Get referencesto the modules (or the module content) that we need
const stats = require("stats.js");
const BitSet = require("sets.js").BitSet;

// Now write code using those modules
let s  = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // average is 20