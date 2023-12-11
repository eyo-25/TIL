const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const num = +input[0];

for (let i = 1; i <= num; i++) {
  const array = input[i]
    .trim()
    .split(" ")
    .map((item) => +item);
  let num2 = array[0];
  let count = 0;
  const result = array.reduce((acc, cur, idx) => {
    if (idx === 0) {
      return acc;
    } else {
      return acc + cur;
    }
  }, 0);
  const avg = result / num2;
  for (let i = 1; i <= num2; i++) {
    if (avg < array[i]) {
      count++;
    }
  }
  console.log(((count / num2) * 100).toFixed(3) + "%");
}
