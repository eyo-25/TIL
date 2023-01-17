const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;
solution(input);

function solution(n) {
  let starResult = "";
  for (let index = 1; index < n + 1; index++) {
    let sum = "";
    for (let i = 1; i < n + 1; i++) {
      if (i < n + 1 - index) {
        sum = sum + " ";
      } else {
        sum = sum + "*";
      }
    }
    starResult = `${starResult && starResult + "\n"}` + sum;
  }
  console.log(starResult);
}
