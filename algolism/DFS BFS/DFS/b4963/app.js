const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input.pop();
const arr = input.map((el) => el.split(" ").map((el) => +el.trim()));

solution(arr);

function solution(arr) {
  const sizeArr = [];
  const mapArr = [];
  const answer = [];
  for (let i = 0; i < arr.length; i++) {
    sizeArr.push(arr[i]);
    const h = arr[i][1];
    const map = [];
    for (let j = 1; j <= h; j++) {
      map.push(arr[i + j]);
    }
    mapArr.push(map);
    i += h;
  }

  for (let i = 0; i < mapArr.length; i++) {
    const graph = {};
    let island = 0;

    function DFS(x, y) {
      // base case
      if (graph[x] && graph[x][y] && graph[x][y] !== 0) {
        graph[x][y] = 0;

        DFS(x + 1, y);
        DFS(x - 1, y);
        DFS(x, y + 1);
        DFS(x, y - 1);
        DFS(x + 1, y - 1);
        DFS(x - 1, y + 1);
        DFS(x + 1, y + 1);
        DFS(x - 1, y - 1);
      }
    }

    mapArr[i].forEach((map) => {
      map.forEach((el, idx) => {
        graph[idx] = graph[idx] ? [...graph[idx], el] : [el];
      });
    });

    for (let x in graph) {
      graph[x].forEach((el, y) => {
        if (el === 1) {
          island++;
          DFS(+x, y);
        }
      });
    }

    answer.push(island);
  }
  console.log(answer.join("\n"));
}
