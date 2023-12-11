const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => +item.replace(/\r/g, ""));

let inter = input.shift();
let stackNum = 1;
let stack = [];
let result = [];

for (let i = 0; i < inter; i++) {
  let num = input[i];

  while (stackNum <= num) {
    stack.push(stackNum);
    stackNum++;
    result.push("+");
  }

  let = stackPop = stack.pop();
  result.push("-");

  if (stackPop !== num) {
    result = ["NO"];
    break;
  }
}

console.log(result.join("\n"));
