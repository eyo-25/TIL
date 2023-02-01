const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));
const [n, k] = input[0].split(" ");

let array = Array.from({ length: n }, (v, i) => i + 1);
let result = [];

while (0 < array.length) {
  for (let i = 1; i <= +k; i++) {
    if (i === +k) {
      result.push(array.shift());
    } else {
      array.push(array.shift());
    }
  }
}

console.log(`<${result.join(", ").trim()}>`);
