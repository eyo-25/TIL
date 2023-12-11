const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
input = input.split(" ");
input = input.map((item) => +item);

solution(input);

function solution(findArray) {
  const chessArray = [1, 1, 2, 2, 2, 8];
  const answerArray = [];

  chessArray.map((chessNumber, i) => {
    answerArray[i] = `${chessNumber - findArray[i]}`;
  });

  const answer = answerArray.join(" ");

  console.log(answer);
}
