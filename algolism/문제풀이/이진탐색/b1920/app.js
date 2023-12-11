const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, arr, M, findNums] = input.map((el) => el.trim().split(" ").map(Number));

const answer = [];
arr = arr.sort((a, b) => a - b);
findNums.forEach((findNum) => answer.push(binarySearch(arr, findNum)));

function binarySearch(array, findValue) {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((left + right) / 2);
  // console.log(findValue);
  while (left <= right) {
    // console.log(left, mid, right);
    if (array[mid] < findValue) {
      // mid보다 찾는 값이 클때
      left = mid + 1;
    } else if (array[mid] > findValue) {
      // mid보다 찾는 값이 작을때
      right = mid - 1;
    } else {
      return 1;
    }
    mid = Math.floor((left + right) / 2);
  }

  return 0;
}

console.log(answer.join("\n"));
