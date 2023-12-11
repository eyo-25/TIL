const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [k, ...rest] = input;

const numbers = rest.map((num) => +num);

solution(k, numbers);

function solution(k, numbers) {
  const stack = [];
  numbers.map((num) => {
    switch (num) {
      case 0:
        stack.pop();
        break;
      default:
        stack.push(num);
    }
  });

  const answer = stack.reduce((acc, cu) => acc + cu, 0);
  console.log(answer);
}
