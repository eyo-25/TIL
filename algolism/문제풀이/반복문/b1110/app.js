const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = +input;
solution(input);

//26
function solution(n) {
  let num = n;
  let sum = 100;
  let cycleNum = 0;

  while (n !== sum) {
    let a = num % 10;
    let b = ((num % 100) - (num % 10)) / 10;
    let plus = a + b;
    let plusLeft = plus % 10;
    sum = a * 10 + plusLeft;
    num = sum;

    cycleNum++;
  }
  console.log(cycleNum);
}
