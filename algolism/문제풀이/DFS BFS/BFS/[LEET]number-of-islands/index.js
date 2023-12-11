/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = [0, -1, 1, 0];
  const dy = [1, 0, 0, -1];
  let islands = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        islands++;
        BFS(i, j);
      }
    }
  }

  function BFS(row, col) {
    const queue = [];
    queue.push([row, col]);
    grid[row][col] = 0;

    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = dx[i] + cx;
        const ny = dy[i] + cy;

        if (
          nx < 0 ||
          rows <= nx ||
          ny < 0 ||
          cols <= ny ||
          grid[nx][ny] === "0"
        ) {
          continue;
        }

        queue.push([nx, ny]);
        grid[nx][ny] = "0";
      }
    }
  }

  // console.log(islands);
  return islands;
};
