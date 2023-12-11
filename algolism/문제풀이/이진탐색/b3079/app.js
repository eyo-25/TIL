const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(BigInt);
const [...arr] = input.map(BigInt);

binarySearch(arr);
function binarySearch(array) {
  let left = 1n;
  let right = array[0] * M;
  let mid = 0n;
  let answer = 0n;

  while (left <= right) {
    mid = BigInt((right + left) / 2n);

    let cnt = arr.reduce((acc, cu) => (acc += BigInt(mid / cu)), 0n);
    // console.log(left, mid, right, cnt);

    if (M <= cnt) {
      // 현재 기준안에 M이상으로 모두 검색 통과한 경우
      // 시간을 줄여도 되기에 mid 미만으로 탐색
      right = mid - 1n;
      answer = mid;
    } else {
      //현재 기준안에 M미만으로 모두 검색 통과 못한 경우
      // 시간을 늘려야 되기에 mid 초과로 탐색
      left = mid + 1n;
    }
  }

  console.log(answer.toString());
}
