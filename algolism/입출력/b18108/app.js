const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;

solution(input);

function solution(year) {
  //write your code
  console.log(year - 543);
}
