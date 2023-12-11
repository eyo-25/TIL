const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  for (let i = 0; i < input.length; i++) {
    let [a, b] = input[i].split(" ").map((item) => +item);
    const plus = a + b;
    if (0 < a && b < 10) {
      console.log(plus);
    }
  }
}
