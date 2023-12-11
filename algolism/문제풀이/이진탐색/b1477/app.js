const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input.shift().split(" ").map(Number);
let arr = [0, L];
if (0 < N) {
  arr = [0, ...input[0].split(" ").map(Number), L];
}
arr.sort((a, b) => a - b);

let left = 1;
let right = L - 1;
let mid = 0;

while (left <= right) {
  mid = Math.floor((left + right) / 2);
  let sum = 0;

  for (let i = 1; i < arr.length; i++) {
    sum += Math.floor((arr[i] - arr[i - 1] - 1) / mid);
  }

  if (sum > M) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(left);
