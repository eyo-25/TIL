const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 나무 M미터 필요

// 목재 절단기
// 절단기에 높이 H를 지정
// 한 줄에 연속해있는 나무를 모두 절단
// 높이가 H보다 큰 나무는 H 위의 부분이 잘릴 것이고
// 낮은 나무는 잘리지 않을 것이다.

// 절단기에 설정할 수 있는 높이의 최댓값

// 입력
// 1 : 나무의 수 N , 가져갈 나무의 길이 M
// 2 : N개의 나무높이를 가진 배열

const [[N, M], arr] = input.map((el) => el.trim().split(" ").map(Number));
// arr.sort((a, b) => a - b);

binarySearch(arr, M);
function binarySearch(array, findValue) {
  let left = 0;
  let right = Math.max(...array);
  let mid = Math.floor((left + right) / 2);
  let totalLength;

  while (left <= right) {
    totalLength = arr.reduce((acc, cu) => {
      const length = cu - mid;
      return 0 < length ? acc + length : acc;
    }, 0);
    // console.log(left, mid, right, totalLength);

    // mid보다 더짤라도 되겠네
    if (totalLength >= findValue) {
      // mid보다 더 짜르는 방향검토
      left = mid + 1;
    } else {
      // mid보다 덜 짜르는 방향검토
      right = mid - 1;
    }
    mid = Math.floor((left + right) / 2);
  }

  console.log(right);
}
