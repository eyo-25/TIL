const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0].split(" ").map((item) => item.toString());
solution(input);

function solution(input) {
  const a = input[0].split("").reverse().join("");
  const b = input[1].split("").reverse().join("");
  if (+a < +b) {
    console.log(+b);
  } else {
    console.log(+a);
  }
}
