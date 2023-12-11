const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim();

solution(input);

function solution(input) {
  const arr = input
    .split("-")
    .map((el) => el.split("+").reduce((acc, cu) => +acc + +cu, 0));
  const answer = arr.reduce((acc, cu) => acc - cu);
  console.log(answer);
}
