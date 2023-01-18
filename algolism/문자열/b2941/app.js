const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(input) {
  let count = 0;
  let str = input.toString();
  if (input.includes("s=")) {
    str.split("s=", 0);
    count += 1;
  }
  console.log(str.indexOf("s="));
}
