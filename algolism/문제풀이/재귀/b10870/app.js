const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath, "utf8").trim().split("\n");

input = +input;
console.log(fibonachi(input));

function fibonachi(n) {
  if (n <= 1) return n;
  return fibonachi(n - 1) + fibonachi(n - 2);
}

// recursive case
// return = (n - 1) + (n - 2)

// base case
// n이 0이나 1이 되었을때 종료
