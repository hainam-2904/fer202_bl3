var array = [1, 2, 3, 4];

const sum = array.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log("Sum:", sum);

const product = array.reduce(function(accumulator, currentValue) {
    return accumulator * currentValue;
}, 1);
console.log("Product:", product);

const sumArrow = array.reduce((acc, curr) => acc + curr, 0);
const productArrow = array.reduce((acc, curr) => acc * curr, 1);

console.log("Sum (arrow):", sumArrow);
console.log("Product (arrow):", productArrow);
