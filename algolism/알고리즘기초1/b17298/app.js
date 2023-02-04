const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(input) {
  const n = +input[0];
  const nums = input[1].split(" ").map((n) => +n);
  let stack = [];
  //기본 값을 -1로 설정
  let result = Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    const current = nums[i];

    // 스택이 없거나 스택에 마지막에 쌓인 숫자가 현재보다 작을때 결과에 누적
    while (stack.length !== 0 && nums[stack[stack.length - 1]] < current) {
      result[stack.pop()] = current;
    }
    // 위의 경우가 아닐시 스택에 누적
    stack.push(i);
  }

  return result;
}

const result = solution(input);
console.log(result.join(" ").trim());
