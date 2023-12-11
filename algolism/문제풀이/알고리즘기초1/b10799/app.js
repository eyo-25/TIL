const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("");

function solution(input) {
  const array = input;
  let stack = [];
  let answer = 0;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    // 레이져인 경우
    if (element === "(" && array[i + 1] === ")") {
      answer += stack.length;
      i += 1;
    }
    // 쇠막대기 추가
    else if (element === "(") {
      stack.push(element);
    }
    // 쇠막대기 제거
    else if (element === ")") {
      stack.pop();
      answer += 1;
    }
  }

  return answer;
}

const result = solution(input);
console.log(result);
