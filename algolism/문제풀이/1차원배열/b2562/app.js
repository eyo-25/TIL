const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((item) => +item);

solution(input);

function solution(input) {
  const max = Math.max(...input);
  const index = input.findIndex((item) => item == max) + 1;
  console.log(`${max}` + "\n" + `${index}`);
}
