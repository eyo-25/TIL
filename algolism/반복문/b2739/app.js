const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;

solution(input);

function solution(n) {
  const multilyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  multilyArray.map((item) => console.log(`${n} * ${item} = ${n * item}`));
}
