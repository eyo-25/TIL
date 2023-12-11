const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(0).toString().split("\n");
// 이문제는 런타임에러떄문에 readFileSync(0)으로 입력

solution(+input[0], +input[1]);

function solution(x, y) {
  let ans = 0;
  //write your code
  if (0 < x && 0 < y) {
    ans = 1;
  }
  if (x < 0 && 0 < y) {
    ans = 2;
  }
  if (x < 0 && y < 0) {
    ans = 3;
  }
  if (0 < x && y < 0) {
    ans = 4;
  }
  console.log(ans);
}
