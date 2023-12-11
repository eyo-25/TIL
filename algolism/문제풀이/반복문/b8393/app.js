const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = +input[0];

solution(input);

function solution(n) {
  let sum = 0;
  for (let i = 1; i < n + 1; i++) {
    sum = sum + i;
  }
  console.log(sum);
}
