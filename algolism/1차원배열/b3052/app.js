const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input = input.map((item) => +item);

solution(input);

function solution(input) {
  let diffArray = [input[0] % 42];
  input.forEach((item) => {
    const num = item % 42;
    const index = diffArray.findIndex((item) => item === num);
    if (index === -1) {
      diffArray.push(num);
    }
  });
  console.log(diffArray.length);
}
