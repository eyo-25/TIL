const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;

solution(input);

function solution(year) {
  //write your code
  if ((year % 4 == 0 && year % 100 !== 0) || year % 400 == 0) {
    console.log(1);
  } else {
    console.log(0);
  }
}
