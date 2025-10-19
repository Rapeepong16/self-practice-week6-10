//Practice-1 ID Generator
function getID (){
  let initialID = 1
  function addId (){
    return initialID++
  }
  return addId
}
const idGen = getID()
console.log(idGen());
console.log(idGen());
console.log(idGen());

//Practice-2 outerFunction
function outerFunction(a){
  function innerFunction(b){
    return a + b
  }
  return innerFunction
}
const addFive = outerFunction(5)
console.log(addFive(3));

const addTen = outerFunction(10)
console.log(addTen(2));

//เขียนฟังก์ชัน applyOperation(a, b, operation) โดย operation เป็นฟังก์ชัน
function add(x, y) { return x + y; }
function multiply(x, y){return x * y}
function divide(x, y){return x / y}

function applyOperation(a, b, operation) {
  return operation(a, b);
}

console.log(applyOperation(2 , 3 , add));
console.log(applyOperation(6 , 3 , divide));
console.log(applyOperation(2 , 3 , multiply));
