const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;
solution(input);

function solution(n) {
  let starResult = "";
  for (let index = 1; index < n + 1; index++) {
    let starSum = "*";
    for (let i = 1; i < index; i++) {
      starSum = starSum + "*";
    }
    starResult = `${starResult && starResult + "\n"}` + starSum;
  }
  console.log(starResult);
}
