const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  let indexArray = input[0].split(" ").map((item) => +item);
  for (let i = 1; i <= indexArray[0]; i++) {
    const array = input[i].split(" ").map((item) => +item);
    const array2 = input[i + indexArray[0]].split(" ").map((item) => +item);
    let result = [];
    for (let i = 0; i < indexArray[1]; i++) {
      result.push(array[i] + array2[i]);
    }
    console.log(...result);
  }
}
