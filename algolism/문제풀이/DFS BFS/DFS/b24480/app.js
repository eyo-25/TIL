const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const arr = input.map((el) => el.split(" ").map((el) => +el.trim()));

solution(arr);

function solution([[nodeNum, lineNum, startNode], ...arr]) {
  const graph = new Map();
  const visited = new Array(nodeNum).fill(0);
  let count = 1;

  //그래프 빈배열 할당
  for (let i = 1; i <= nodeNum; i++) {
    graph.set(i, []);
  }

  //연결된 노드 할당
  for (let i = 1; i <= arr.length; i++) {
    const [start, end] = arr[i - 1];
    graph.get(start).push(end);
    graph.get(end).push(start);
  }

  graph.forEach((e) => e.sort((a, b) => b - a));

  dfs(startNode);
  function dfs(node) {
    if (visited[node - 1] === 0) {
      visited[node - 1] = count;
      count++;
      graph.get(node).forEach((el) => {
        dfs(el);
      });
    }
  }
  console.log(visited.join("\n"));
}
