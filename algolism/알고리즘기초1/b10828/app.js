const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input;

let stack = [];
let result = [];

for (let i = 1; i <= +input[0]; i++) {
  const array = input[i].trim().split(" ");
  if (array[0] === "push") {
    const num = +array[1];
    stack.push(num);
  }
  if (array[0] === "top") {
    result.push(stack.length <= 0 ? -1 : stack[stack.length - 1]);
  }
  if (array[0] === "size") {
    result.push(stack.length);
  }
  if (array[0] === "pop") {
    if (stack.length <= 0) {
      result.push(-1);
    } else {
      const x = stack.pop();
      result.push(x);
    }
  }
  if (array[0] === "empty") {
    if (stack.length <= 0) {
      result.push(1);
    } else {
      result.push(0);
    }
  }
}

console.log(result.join("\n"));
