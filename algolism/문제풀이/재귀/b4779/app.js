const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath, "utf8").trim().split("\n");

const nums = input.map((el) => +el);
solution(nums);

function recursion(cantorSet) {
  if (cantorSet.length <= 1) return cantorSet;
  else {
    const division = cantorSet.length / 3;
    const front = cantorSet.slice(0, division);
    const middle = " ".repeat(division);
    const back = cantorSet.slice(cantorSet.length - division);

    return recursion(front) + middle + recursion(back);
  }
}

function solution(nums) {
  for (let i = 0; i < nums.length; i++) {
    const set = Math.pow(3, nums[i]);
    const cantorSet = "-".repeat(set);
    console.log(recursion(cantorSet));
  }
}

// base case
// 모든 선의 길이가 1이면 멈춘다

// recursive case
// 선의 길이가 1이상이면 3등분으로 나눈다.
