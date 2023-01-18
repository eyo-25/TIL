const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  for (let i = 1; i <= +input[0]; i++) {
    const array = input[i].split(" ");
    const result = array[1].split("").reduce((acc, cur) => {
      return acc + cur.repeat(+array[0]);
    }, "");
    console.log(result);
  }
}
