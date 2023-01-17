const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

// 5
// 20 10 35 30 7
function solution(input) {
  const array = input[1].split(" ").map((item) => +item);
  console.log(`${Math.min(...array)}` + " " + `${Math.max(...array)}`);
}
