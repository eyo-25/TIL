const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, H] = input.shift().split(" ").map(Number);
const up = [];
const down = [];
input.forEach((el, idx) => (idx % 2 === 0 ? up.push(+el) : down.push(+el)));
up.sort((a, b) => a - b);
down.sort((a, b) => a - b);

// [최솟값, 횟수]
const answer = [N, 0];

for (let i = 0; i < H; i++) {
  let crashed = 0;
  const upIndex = binarySearch(up, i + 1);
  const downIndex = binarySearch(down, H - i);
  if (0 <= upIndex) crashed += up.length - upIndex;
  if (0 <= downIndex) crashed += down.length - downIndex;

  // 충돌 더 작으면 최솟값 갱신
  if (crashed < answer[0]) {
    answer[0] = crashed;
    answer[1] = 1;
  } else if (crashed === answer[0]) {
    answer[1]++;
  }
}

function binarySearch(array, findValue) {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((left + right) / 2);
  let index = -1;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // console.log(left, mid, right);
    if (findValue <= array[mid]) {
      right = mid - 1;
      index = mid;
    } else {
      left = mid + 1;
    }
  }
  return index;
}

console.log(answer.join(" "));

// 동굴의 길이 N미터
// 높이 H미터
// 첫번째는 석순이고 두번째는 종유석

// 장애물구간 = arr[i]
// 석순 = arr[i] 이하면 부딪힘
// 종유석 = N - arr[i] 이하이면 부딪힘

// 부딪히는 양을 이분탐색
// N / 2 = 임의의 기준

// 임의의 기준으로 동굴의 높이만큼 각 높이 탐색
// 임의의 기준이하로 부딛치는 높이가 있으면 cnt 저장

// cnt가 있다? answer에 저장 + mid미만 탐색 (덜 맞아도 되는지 탐색)
// 없다 mid미만 탐색

// 최적화 해야하는것 높이x가로탐색 즉, 높이를 이분탐색해야함
