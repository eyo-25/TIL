const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0].split(" ");
input = input.map((item) => +item);

solution(input[0], input[1]);

function solution(h, m) {
  const count = h * 60 + m;

  if (count <= 44) {
    const leftCount = 1440 - (45 - m);
    console.log(
      Math.floor(leftCount / 60),
      leftCount - Math.floor(leftCount / 60) * 60
    );
  }
  if (45 <= count) {
    const leftCount = count - 45;
    console.log(
      Math.floor(leftCount / 60),
      leftCount - Math.floor(leftCount / 60) * 60
    );
  }
}
