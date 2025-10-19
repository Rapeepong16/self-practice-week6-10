//In Class 
function calculate(nums, compute) {
  return compute(nums)
}
function sum(elements) {
  return elements.reduce((total, current) => total + current)
}
function max(elements) {
  return Math.max(...elements)
}
function min(elements) {
  return Math.min(...elements)
}
function sort(elements) {
  return elements.sort((a, b) => a - b)
}
console.log(calculate([1, 3, 5, 7], sum))
console.log(calculate([100, 3, 5, 7], max))
console.log(calculate([10, 2, 0, 7], min))
console.log(calculate([10, 2, 0, 7], sort))


 function a() {
  return sum
}
function b() {
  return sum(1, 5)
}
function c(x) {
  return x
}
function sum(n1, n2) {
  return n1 + n2
}

console.log(typeof a())
console.log(typeof b())
console.log(typeof c(sum))


//Example Closure Function
const add = x => y => x + y;
const add5 = add(5); // x = 5 ถูกเก็บไว้ใน closure
console.log(add5(10))
