const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  for (let i = 1; i < +input[0] + 1; i++) {
    const abArray = input[i].split(" ");
    const a = +abArray[0];
    const b = +abArray[1];
    console.log(`Case #${i}: ${a} + ${b} = ${a + b}`);
  }
}
