const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, nums] = input;
nums = nums
  .split(" ")
  .map((el) => +el)
  .sort((a, b) => a - b);

solution(n, nums);

function solution(n, nums) {
  let time = 0;
  let result = 0;
  nums.forEach((num) => {
    result = result + time + num;
    time += num;
  });
  console.log(result);
}
