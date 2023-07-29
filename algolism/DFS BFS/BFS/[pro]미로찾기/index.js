function solution(maps) {
  const point = {};
  const matrix = maps.map((e) => e.split(""));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "S") point["start"] = [i, j];
      if (matrix[i][j] === "L") point["lever"] = [i, j];
      if (matrix[i][j] === "E") point["end"] = [i, j];
    }
  }

  const a = BFS(matrix, point["start"], point["lever"]);
  const b = BFS(matrix, point["lever"], point["end"]);

  if (a === -1 || b === -1) return -1;
  return a + b;
}

function BFS(matrix, start, end) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const routes = Array.from(Array(rows), () => Array(cols).fill(Infinity));

  const queue = [start];
  routes[start[0]][start[1]] = 0;

  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      const [x, y] = queue.shift();

      if (x === end[0] && y === end[1]) return routes[x][y];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || rows <= nx) continue;
        if (ny < 0 || cols <= ny) continue;
        if (matrix[nx][ny] === "X") continue;
        if (routes[x][y] + 1 >= routes[nx][ny]) continue;

        routes[nx][ny] = routes[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return -1;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
