// Uma função geradora que um gama de números inteiros
function* range(from, to) {
    for(let i = from; i <= to; i++) {
        yield i;
    }
}

for(let num of range(1, 10)) {
    console.log(num)
}