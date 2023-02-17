const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, expression, ...nums] = input;
expression = expression.trim().split("");
const numsArry = nums.map((num) => +num);

function solution(n, expression, numsArry) {
  const ASCII = 65;
  const operator = ["+", "-", "*", "/"];
  let alphabetObj = {};
  const stack = [];

  const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  for (let i = 0; i < n; i++) {
    const alphabet = String.fromCharCode(ASCII + i);
    alphabetObj[alphabet] = numsArry[i];
  }

  for (let i = 0; i < expression.length; i++) {
    const slice = expression[i];
    // 연산자 분류
    if (operator.includes(slice)) {
      const val2 = stack.pop();
      const val1 = stack.pop();
      const calculateNum = calculator[slice](val1, val2);
      stack.push(calculateNum);
    } else {
      const convertNum = alphabetObj[slice];
      stack.push(convertNum);
    }
  }

  const result = (Math.round(stack[0] * 100) / 100).toFixed(2);

  return result;
}

const answer = solution(n, expression, numsArry);

console.log(answer);
