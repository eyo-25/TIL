const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, ...times] = input;
times = times
  .map((el) =>
    el
      .trim()
      .split(" ")
      .map((num) => +num)
  )
  .sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });
solution(n, times);

function solution(n, times) {
  times = times.filter(([a, b]) => a <= b);
  let answer = 0;
  let endTime = 0;

  times.forEach((time) => {
    if (endTime <= time[0]) {
      answer++;
      endTime = time[1];
    }
  });

  console.log(answer);
}
