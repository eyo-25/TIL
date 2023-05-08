const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input[0] = input[0].split(" ").map((el) => +el.trim());
const [[K, N], ...rest] = input;
const arr = rest.map((el) => +el.trim()).sort((a, b) => a - b);

binarySearch(arr, N);
function binarySearch(array, findValue) {
  let left = 0;
  let right = Math.max(...array);
  let mid = Math.floor((left + right) / 2);
  let lineNum = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    lineNum = arr.reduce((acc, cu) => {
      return acc + Math.floor(cu / mid);
    }, 0);

    if (findValue <= lineNum) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  console.log(right);
}
