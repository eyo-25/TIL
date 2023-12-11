const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  let answer = "";
  for (let i = 1; i < +input[0] + 1; i++) {
    const abArray = input[i].split(" ");
    answer = (answer && answer + "\n") + `${+abArray[0] + +abArray[1]}`;
  }
  console.log(answer);
}
