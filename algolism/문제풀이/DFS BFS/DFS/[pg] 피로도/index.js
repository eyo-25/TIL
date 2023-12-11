function solution(k, dungeons) {
  let result = 0;
  const rows = dungeons.length;

  // 완탐을 위해 모든 지점에서 시작
  for (let i = 0; i < rows; i++) {
    const newVisited = Array(rows).fill(true);
    DFS(k, i, 0, newVisited);
  }

  function DFS(fatique, start, cnt, visited) {
    const [min, consum] = dungeons[start];

    // based case
    if (!visited[start]) return;
    if (fatique < min || fatique < consum) return;

    // recursive case
    visited[start] = false;
    cnt++;
    if (result < cnt) result = cnt;
    fatique = fatique - consum;

    // 모든 케이스 재귀
    for (let i = 0; i < rows; i++) {
      if (!visited[i]) continue;
      DFS(fatique, i, cnt, [...visited]);
    }
  }

  return result;
}

console.log(
  solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
);
