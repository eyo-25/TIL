const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim();

function calculate(expression) {
  return Function(`return ${expression}`)();
}

solution(input);

function solution(input) {
  const arr = input.split("-").map((el) => calculate(el));
  const arr2 = arr.join("-");
  console.log(calculate(arr2));
}
