function solution(places) {
  const result = [];
  const dis = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const dis2 = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  const dia = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (let i = 0; i < places.length; i++) {
    const room = places[i];
    const graph = [];
    let isPass = true;

    for (let j = 0; j < places[i].length; j++) {
      graph.push(room[j].split(""));
    }

    for (let row = 0; row < graph.length; row++) {
      for (let col = 0; col < graph.length; col++) {
        if (graph[row][col] === "P") {
          const res = search(graph, row, col);
          if (!res) {
            isPass = false;
            break;
          }
        }
      }
      if (!isPass) {
        break;
      }
    }

    if (!isPass) {
      result.push(0);
    } else {
      result.push(1);
    }
  }

  function search(graph, row, col) {
    for (let i = 0; i < 4; i++) {
      const [dx, dy] = dis[i];
      const nx = row + dx;
      const ny = col + dy;

      //room 벗어난 경우
      if (nx < 0 || 5 <= nx || ny < 0 || 5 <= ny) {
        continue;
      }
      if (graph[nx][ny] === "P") {
        return false;
      }

      // 2칸 체크
      const [dx2, dy2] = dis2[i];
      const nx2 = row + dx2;
      const ny2 = col + dy2;

      if (nx2 < 0 || 5 <= nx2 || ny2 < 0 || 5 <= ny2) {
        continue;
      }

      let isX = graph[nx][ny] === "X" ? true : false;
      if (graph[nx2][ny2] === "P" && !isX) {
        return false;
      }
    }

    //대각선 체크 dia
    for (let i = 0; i < 4; i++) {
      const [dx, dy] = dia[i];
      const nx = row + dx;
      const ny = col + dy;

      if (nx < 0 || 5 <= nx || ny < 0 || 5 <= ny) {
        continue;
      }

      // 대각선이 존재한다면 중앙에서 맨해튼거리1에 해당하는 곳은 존재
      // 따라서 해당위치가 X인지만 판별
      let isX = false;
      if (graph[nx][col] === "X" && graph[row][ny] === "X") isX = true;

      if (graph[nx][ny] === "P" && !isX) {
        return false;
      }
    }

    return true;
  }

  // console.log(result);
  return result;
}

solution([
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
]);
