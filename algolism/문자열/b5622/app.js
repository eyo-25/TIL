const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(input) {
  const array = input.split("");
  const result = array.reduce((acc, cur) => {
    let add = 0;
    let isSame = (a, b, c, d = false) =>
      a === cur || b === cur || c === cur || d === cur;
    if (isSame("A", "B", "C")) {
      add += 3;
    }
    if (isSame("D", "E", "F")) {
      add += 4;
    }
    if (isSame("G", "H", "I")) {
      add += 5;
    }
    if (isSame("J", "K", "L")) {
      add += 6;
    }
    if (isSame("M", "N", "O")) {
      add += 7;
    }
    if (isSame("P", "Q", "R", "S")) {
      add += 8;
    }
    if (isSame("T", "U", "V")) {
      add += 9;
    }
    if (isSame("W", "X", "Y", "Z")) {
      add += 10;
    }
    return acc + add;
  }, 0);
  console.log(result);
}
