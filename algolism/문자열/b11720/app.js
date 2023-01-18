const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  const array = input[1].split("").map((item) => +item);
  const result = array.reduce((acc, cur) => {
    return acc + cur;
  });
  console.log(result);
}
