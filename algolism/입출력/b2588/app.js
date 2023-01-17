const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((item) => +item);

solution(+input[0], +input[1]);

function solution(A, B) {
  const stringB = B.toString();
  for (let i = stringB.length - 1; -1 < i; i--) {
    console.log(A * stringB[i]);
  }
  console.log(A * B);
}
