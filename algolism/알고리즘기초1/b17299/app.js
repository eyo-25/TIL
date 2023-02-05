const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input[0];
const nums = input[1].split(" ");
let stack = [];
let result = [];

//각숫자별 갯수가 담긴 obj
const array2 = nums.reduce((acc, cu) => {
  return (acc[cu] = (acc[cu] || 0) + 1), acc;
}, {});

for (let i = n; 0 < i; i--) {
  const current = +nums[i - 1];
  if (stack.length === 0) {
    result.push(-1);
  } else {
    while (
      stack.length !== 0 &&
      array2[stack[stack.length - 1]] <= array2[current]
    ) {
      stack.pop();
    }
    result.push(stack[stack.length - 1] || -1);
  }
  stack.push(current);
}

console.log(result.reverse().join(" "));
