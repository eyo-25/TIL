const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution(input) {
  const expression = input[0].split("");
  const operator1 = ["+", "-"];
  const operator2 = ["*", "/"];
  const stack = [];
  const result = [];

  for (let i = 0; i < expression.length; i++) {
    const slice = expression[i];
    // "(" case
    if (slice === "(") {
      stack.push(slice);
    }
    // ")" case
    if (slice === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        result.push(stack.pop());
      }
      stack.pop();
    }
    // ["+", "-"] case
    if (operator1.includes(slice)) {
      while (0 < stack.length && stack[stack.length - 1] !== "(") {
        result.push(stack.pop());
      }
      stack.push(slice);
    }
    // ["*", "/"] case
    if (operator2.includes(slice)) {
      const last = stack[stack.length - 1];
      while (
        0 < stack.length &&
        (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "/")
      ) {
        result.push(stack.pop());
      }
      stack.push(slice);
    }
    // alphabet case
    if (slice.match(/[a-zA-Z]+/)) {
      result.push(slice);
    }
  }

  while (0 < stack.length) {
    result.push(stack.pop());
  }

  return result.join("");
}

const answer = solution(input);
console.log(answer);
