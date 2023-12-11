const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(input) {
  const array = input
    .trim()
    .split(" ")
    .filter((item) => {
      return item !== "" && item !== undefined && item !== null;
    });
  console.log(array.length);
}
