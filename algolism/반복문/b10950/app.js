const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(array) {
  for (let i = 1; i < +array[0] + 1; i++) {
    const numArray = array[i].split(" ");
    console.log(+numArray[0] + +numArray[1]);
  }
}
