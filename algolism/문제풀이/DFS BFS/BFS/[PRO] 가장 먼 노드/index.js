function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let [start, end] of edge) {
    graph[start].push(end);
    graph[end].push(start);
  }

  const BFS = (startNode) => {
    const queue = [];
    const visited = Array.from({ length: n + 1 }, () => 0);

    //동작
    queue.push(startNode);
    visited[startNode] = 1;

    while (queue.length) {
      const node = queue.shift();
      const value = visited[node];
      for (let linkedNode of graph[node]) {
        if (visited[linkedNode] === 0) {
          queue.push(linkedNode);
          visited[linkedNode] = value + 1;
        }
      }
    }

    return visited;
  };

  const visitedResult = BFS(1);
  const maxNum = Math.max(...visitedResult);
  const maxNumVisited = visitedResult.filter((visit) => visit === maxNum);
  return maxNumVisited.length;
}

solution(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]);
