const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const arr = input.map((el) => el.split(" ").map((el) => +el.trim()));

solution(arr);

function solution([[nodeNum, lineNum, startNode], ...arr]) {
  const graph = new Map();
  let visited = new Array(nodeNum).fill(0);
  let cnt = 1;

  //그래프 세팅
  for (let i = 1; i <= nodeNum; i++) {
    graph.set(i, []);
  }

  //그래프에는 각 노드당 연결되는 노드를 배열로
  for (let i = 1; i <= lineNum; i++) {
    let [start, end] = arr[i - 1];
    graph.get(start).push(end);
    graph.get(end).push(start);
  }

  //그래프의 배열들을 오름차순 정렬
  graph.forEach((v) => {
    v.sort();
  });

  DFS(startNode);
  function DFS(node) {
    //방문하지 않은 노드만 체크
    if (visited[node - 1] === 0) {
      //현재 방문할 노드에 대한 방문한 순서 기록
      visited[node - 1] = cnt;
      //방문한 순서 증가
      cnt++;
      //해당 노드에 연결된 노드 재귀로 탐색
      graph.get(node).forEach((v) => {
        DFS(v);
      });
    }
  }

  console.log(visited.join("\n"));
}
