let a1 = ["banana", "cherry", "apple"];
a1.sort(); // a == ["apple", "banana", "cherry"]
console.log(a1);

let a = [33, 4, 1111, 222];
a.sort(); // a == [1111, 222, 33, 4]; alphabetical order
console.log(a);
a.sort(function(a,b) { // Pass a comparator function
    return a-b; // Returns < 0, 0, or > 0, depending on the orther
}); // a == [4, 33, 222, 1111]; numerical order
console.log(a);
a.sort((a,b) => b-a); // a == [1111, 222, 33, 4]; reverse numerical order
console.log(a);

let b = ["ant", "Bug", "cat", "Dog"];
b.sort(); // b == ["Bug", "Dog", "ant", "cat"]; case-sensitive sort
console.log(b);
b.sort(function(s, t) {
    let a = s.toLocaleLowerCase();
    let b = t.toLocaleLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return  0;
}); // a == ["ant", "Bug", "cat", "Dog"]; case-insensitive sort
console.log(b)