const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  const array = input.map((item) => item.trim().split(" "));
  let max = 0;
  let x = 0; // 가로열
  let y = 0; // 세로행
  for (let i = 0; i < array.length; i++) {
    const arrayMax = Math.max(...array[i]);
    if (max <= arrayMax) {
      max = +arrayMax;
      x = i + 1;
      y = array[i].findIndex((item) => +item === +arrayMax) + 1;
    }
  }
  console.log(`${max}\n${x + " " + y}`);
}
