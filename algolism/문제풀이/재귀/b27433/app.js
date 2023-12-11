const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath, "utf8").trim().split("\n");

input = +input;
console.log(fac(input));

function fac(n) {
  if (n === 0) return 1;
  return n * fac(n - 1);
}
