const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));

for (let i = 1; i <= input[0]; i++) {
  const array = input[i]
    .split(" ")
    .map((item) => item.split("").reverse().join(""));
  console.log(array.join(" "));
}
