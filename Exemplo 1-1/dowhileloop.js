function printArray(a) {
    let len = a.length, i = 0;
    if (len === 0) {
        console.log("Empty Array");
    } else {
        do {
            console.log(a[i]);
        } while (++i < len);
    }
}

let a  = [0,1,2,3,4,5,6,7,8,9];
let b = [];
printArray(a);
printArray(b);