const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

let input1 = input[0].split(" ");
input1 = input1.map((item) => +item);
const input2 = +input[1];

solution(input1[0], input1[1], input2);

function solution(h, m, requiredM) {
  const count = h * 60 + m;
  if (count + requiredM === 1440) {
    console.log(0, 0);
    return;
  }
  if (1440 < count + requiredM) {
    const doneCount = count + requiredM - 1440;
    console.log(
      Math.floor(doneCount / 60),
      doneCount - Math.floor(doneCount / 60) * 60
    );
  } else {
    const doneCount = count + requiredM;
    console.log(
      Math.floor(doneCount / 60),
      doneCount - Math.floor(doneCount / 60) * 60
    );
  }
}
