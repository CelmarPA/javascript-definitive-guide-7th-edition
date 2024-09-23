let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};
console.log(JSON.stringify([point])); // => '["(1, 2)"]'