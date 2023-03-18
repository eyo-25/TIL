const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [info, ...nums] = input;
let [n, k] = info.split(" ").map((el) => +el);
const coins = nums.map((el) => +el);

solution(n, k, coins);

function solution(n, k, coins) {
  let answer = 0;

  while (k > 0) {
    let pop = coins.pop();
    if (pop > k) continue;
    answer += Math.floor(k / pop);
    k = k % pop;
  }

  console.log(answer);
  return answer;
}
