const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(string) {
  const array = string.split("").map((item) => item.toUpperCase());
  let max = 0;
  const array2 = [...new Set(array)];

  let answer = array2.reduce((acc, cur, i) => {
    const result = array.reduce((acc1, cur1) => {
      if (array2[i] === cur1) {
        return acc1 + 1;
      } else {
        return acc1;
      }
    }, 0);

    if (max < result) {
      max = result;
      return array2[i];
    } else if (max === result) {
      max = result;
      return "?";
    } else {
      return acc;
    }
  }, "");
  console.log(answer);
}
