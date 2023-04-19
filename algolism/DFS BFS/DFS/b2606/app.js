const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k, ...rest] = input;
const arr = rest.map((el) => el.split(" ").map((el) => el.trim()));
solution(arr);

function solution(arr) {
  const graph = {};
  arr.forEach(([num1, num2]) => {
    graph[num1] = graph[num1] ? [...graph[num1], num2] : [num2];
    graph[num2] = graph[num2] ? [...graph[num2], num1] : [num1];
  });

  const checked = [];
  const whileCheck = [];

  whileCheck.push("1");

  while (whileCheck.length !== 0) {
    const node = whileCheck.pop();
    if (!checked.includes(node)) {
      checked.push(node);
      if (graph[node]) {
        whileCheck.push(...graph[node]);
      }
    }
  }

  console.log(checked.length - 1);
}
