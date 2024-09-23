let data = [1,2,3,4,5], sum = 0;
// Compute the sum of the elements of the array
data.forEach(value => { sum += value; }); // sum == 15
console.log(sum);

// Now increment echa array element
data.forEach(function(v, i, a){ a[i] = v + 1; }); // data == [2,3,4,5,6]0
console.log(data);