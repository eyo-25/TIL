const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [goal, ...rest] = input;
const [N, M] = goal.split(" ").map(Number);
const map = rest.map((el) => el.trim().split("").map(Number));

solution(N, M, map);

function solution(N, M, map) {
  //방문한 배열
  const visited = {};
  //탐색중인 배열
  let queue = [[0, 0]];
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  BFS(0, 0);
  function BFS(x, y) {
    visited[[x, y]] = 1;
    while (queue.length) {
      const cu = queue.shift();
      for (let j = 0; j < 4; j++) {
        const nx = cu[0] + dir[j][0];
        const ny = cu[1] + dir[j][1];
        if (
          0 <= nx &&
          0 <= ny &&
          nx < N &&
          ny < M &&
          !visited[[nx, ny]] &&
          map[nx][ny] === 1
        ) {
          visited[[nx, ny]] = visited[cu] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
  console.log(visited[[N - 1, M - 1]]);
}
