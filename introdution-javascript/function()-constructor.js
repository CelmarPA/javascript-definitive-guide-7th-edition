const f = new Function("x", "y", "return x*y;");

scope = "global";
function constructFunction() {
    let scope = "local";
    return new Function("return scope");
// Doesn't capture local scope!
}
// This line returns "global" because the function retuned by the
// Function() contructor does not use the local scope.
console.log(constructFunction()()); // => "global"