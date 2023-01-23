const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));
input.shift();

let stack = [];

const fn = {
  push: (cu) => {
    stack.push(cu.split(" ")[1]);
    return "";
  },
  pop: () => stack.pop() || -1,
  top: () => stack[stack.length - 1] || -1,
  size: () => stack.length,
  empty: () => (stack[0] ? 0 : 1),
};

const result = input.reduce((acc, cu) => {
  return acc + (fn[cu] ? `${fn[cu]()}\n` : fn.push(cu));
}, "");

console.log(result.trim());
