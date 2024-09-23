console.log(BigInt(Number.MAX_SAFE_INTEGER)); // => 9007199254740991n
let string = "1" + "0".repeat(100); // 1 seguido por 100 zeros.
console.log(string);
console.log(BigInt(string)); // => 10n**100n: 1 googol

console.log(1000n + 2000n); // => 3000n
console.log(3000n - 2000n); // => 1000n
console.log(2000n * 3000n); // => 6000000n
console.log(3000n / 997n); // => 3n: o quociente é 3
console.log(3000n % 997n); // => 9n: resto da divisão é 9
// console.log((2n ** 131071n) - 1n); // => Um primo de Mersenne com 39457 digitos decimais

console.log(1 < 2n); // => true
console.log(2 > 1n); // => true
console.log(0 == 0n); // => true
console.log(0 === 0n); // => false: O === verifica pela igualidade de typo também9