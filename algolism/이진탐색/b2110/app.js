const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input[0] = input[0].trim().split(" ").map(Number);
const [[N, C], ...rest] = input;
const arr = rest.map((el) => +el.trim()).sort((a, b) => a - b);

binarySearch(arr);
function binarySearch(array) {
  let min = 1;
  let max = array[N - 1];
  let mid = 0;
  let answer = 0;

  while (min <= max) {
    mid = Math.floor((max + min) / 2);

    let cnt = 1;
    let prev = array[0];
    for (let i = 1; i < N; i++) {
      if (mid <= array[i] - prev) {
        cnt++;
        prev = array[i];
      }
    }

    if (C <= cnt) {
      min = mid + 1;
      answer = mid;
    } else {
      max = mid - 1;
    }
  }

  console.log(answer);
}
