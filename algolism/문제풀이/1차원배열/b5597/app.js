const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((item) => +item);
solution(input);

function solution(input) {
  let absentArray = [];
  for (let i = 1; i < 31; i++) {
    const index = input.findIndex((item) => i == item);
    if (index < 0) {
      absentArray.push(i);
    }
  }
  const min = Math.min(...absentArray);
  const max = Math.max(...absentArray);
  console.log(`${min}` + "\n" + `${max}`);
}
