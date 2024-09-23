for(let count = 0; count < 10; count++) {
    console.log(count);
}

let i, j, sum = 0;
for(i = 0, j = 10; i < 10; i++, j--) {
    sum += i * j;
}
console.log(sum);

function tail(o) { // Retorna o último objeto da lista linkada
    for(; o.next; o = o.next) /* empty */ ; // Percorre enquando o.next é verdadeiro
    return o;
}