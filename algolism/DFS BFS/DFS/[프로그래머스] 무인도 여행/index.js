function solution(maps) {
  const answer = [];
  const graph = maps.map((string) => string.split(""));
  const dRow = [1, 0, -1, 0];
  const dCol = [0, 1, 0, -1];

  const rowLength = graph.length - 1;
  const colLength = graph[0].length - 1;

  for (let i = 0; i <= rowLength; i++) {
    for (let j = 0; j <= colLength; j++) {
      if (graph[i][j] !== "X") {
        answer.push(DFS(i, j, 0));
      }
    }
  }

  function DFS(row, col, cnt) {
    if (row > rowLength || col > colLength || row < 0 || col < 0) {
      return cnt;
    }

    if (graph[row][col] === "X") {
      return cnt;
    }

    cnt += Number(graph[row][col]);
    graph[row][col] = "X";

    for (let i = 0; i < 4; i++) {
      cnt = DFS(row + dRow[i], col + dCol[i], cnt);
    }

    return cnt;
  }

  // console.log(answer.sort());
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

solution(["X591X", "X1X5X", "X231X", "1XXX1"]);
