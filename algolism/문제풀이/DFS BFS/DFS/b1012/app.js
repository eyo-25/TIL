const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [testCase, ...rest] = input;
const arr = rest.map((el) => el.trim().split(" ").map(Number));

solution(testCase, arr);
function solution(testCase, arr) {
  let answer = [];
  // index로 테스트 사양을 불러온다.
  let index = 0;
  // 변수등록
  let graph, visited, M, N, K, cnt;

  // 케이스별로 답을 도출한다.
  for (let i = 0; i < testCase; i++) {
    cnt = 0;
    [M, N, K] = arr[index];
    graph = new Map();
    // 그래프를 세팅합니다.
    for (let i = 0; i < N; i++) {
      graph.set(i, new Array(M).fill(0));
    }
    // 배추를 할당합니다.
    for (let i = 1; i <= K; i++) {
      const [w, h] = arr[index + i];
      graph.get(h)[w] = 1;
    }
    // 완전탐색
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        // 배추가 있는 경우만 탐색
        if (graph.get(i)[j] === 1) {
          cnt++;
          DFS(i, j);
        }
      }
    }
    answer.push(cnt);

    // 다음 케이스탐색을 위해 인덱스 증가
    index += K + 1;
  }

  function DFS(x, y) {
    const distances = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    // 현재 좌표에 배추가 있는 경우만 할당/재귀
    if (graph.get(x) && graph.get(x)[y] && graph.get(x)[y] === 1) {
      graph.get(x)[y] = 0;

      distances.forEach(([dx, dy]) => {
        DFS(x + dx, y + dy);
      });
    }
  }

  console.log(answer.join("\n"));
}
