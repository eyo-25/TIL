const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath, "utf8").trim().split("\n");

let N = Number(input); // 원판의 갯수
let actions = [];
let count = 0;

function Hnoi(num, from, other, to) {
  if (num === 0) {
    return;
  }
  Hnoi(num - 1, from, to, other);
  actions.push([from, to]);
  count++;
  Hnoi(num - 1, other, from, to);
}

Hnoi(N, "1", "2", "3");
const answer = [count, ...actions.map((arr) => arr.join(" "))];
console.log(answer.join("\n"));
