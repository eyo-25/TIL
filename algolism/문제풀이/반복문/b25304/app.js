const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  // console.log(input.length);
  const totalPay = +input[0];
  const productNum = +input[1];
  let sum = 0;
  for (let i = productNum + 1; 1 < i; i--) {
    const payArray = input[i].split(" ");
    sum = sum + +payArray[0] * +payArray[1];
  }
  if (sum == totalPay) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}
