const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));

let numObj = {};

for (let i = 2; i < input.length; i++) {
  const alphabet = String.fromCharCode(i - 2 + 65);
  const num = +input[i];
  numObj[alphabet] = num;
}

function calculator(val1, val2, slice) {
  let sum = 0;
  switch (slice) {
    case "+":
      sum = (val1 ? val1 : 0) + val2;
      break;
    case "-":
      sum = (val1 ? val1 : 0) - val2;
      break;
    case "*":
      sum = (val1 ? val1 : 0) * val2;
      break;
    case "/":
      sum = (val1 ? val1 : 0) / val2;
      break;
    default:
      0;
      break;
  }
  return sum;
}

let stack = [];
let array = input[1].split("");
let result = 0;

for (let i = 0; i < array.length; i++) {
  const slice = array[i];
  const sliceNum = numObj[slice];
  // number타입 구별
  if (typeof sliceNum === "number") {
    stack.push(sliceNum);
  } else {
    const val2 = stack.pop();
    const val1 = stack.pop();
    //스택이 비었는지 분류
    if (stack.length <= 0 && typeof val1 !== "undefined") {
      const val3 = calculator(val1, val2, slice);
      const nextSlice = array[i + 1];
      //스택이 비었는데 다음 input이 연산자일경우
      if (nextSlice && nextSlice.match(/[\+\-\/\*]+/)) {
        result = calculator(result, val3, nextSlice);
      } else {
        result = val3;
      }
      if (array[i + 2] === undefined) {
        break;
      }
    } else if (stack.length <= 0 && typeof val1 === "undefined") {
      result = calculator(result, val2, slice);
    } else {
      const val3 = calculator(val1, val2, slice);
      result += val3;
    }
  }
}

console.log((Math.round(result * 100) / 100).toFixed(2));
