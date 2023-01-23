const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));

for (let i = 1; i <= +input[0]; i++) {
  let array = input[i];
  while (array.includes("()")) {
    array = array.split("()").join("");
  }
  console.log(array.length === 0 ? "YES" : "NO");
}
