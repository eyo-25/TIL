const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath, "utf8").trim().split("\n");

const [t, ...rest] = input;
const stings = rest.map((string) => string.trim());
solution(t, stings);

function recursion(stings, start, end, count) {
  count++;
  if (start >= end) return `1 ${count}`;
  else if (stings[start] !== stings[end]) return `0 ${count}`;
  else return recursion(stings, start + 1, end - 1, count);
}

function isPalindrome(s) {
  return recursion(s, 0, s.length - 1, 0);
}

function solution(t, stings) {
  for (let i = 0; i < t; i++) {
    console.log(isPalindrome(stings[i]));
  }
}
