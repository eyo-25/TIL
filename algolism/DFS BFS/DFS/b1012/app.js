const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [k, ...rest] = input;

const arr = rest.map((el) => el.trim().split(" "));

solution(arr);

function solution(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    let count = 0;

    if (el.length === 3) {
      const graph = {};
      for (let j = 0; j < el[1]; j++) {
        graph[j] = Array.from({ length: el[0] }, () => 0);
      }

      for (let j = 0; j < el[2]; j++) {
        const h = arr[i + j + 1][1];
        const w = +arr[i + j + 1][0];
        graph[h][w] = 1;
      }

      const DFS = (h, w) => {
        if (graph[h] && graph[h][w] && graph[h][w] !== 0) {
          graph[h][w] = 0;

          DFS(h - 1, w);
          DFS(h, w + 1);
          DFS(h + 1, w);
          DFS(h, w - 1);
        }
      };

      for (let h in graph) {
        graph[h].forEach((el, w) => {
          if (el === 1) {
            count++;
            DFS(+h, w);
          }
        });
      }

      answer.push(count);
      i += +el[2];
    }
  }
  console.log(answer.join("\n"));
}
