const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

solution(input);

function solution(input) {
  const x = input[0].split(" ").map((item) => +item);
  const array = input[1].split(" ").map((item) => +item);
  const result = array.filter((number) => number < x[1]);
  let answer = "";
  result.map((item) => {
    answer = (answer && `${answer}` + " ") + `${item}`;
  });
  console.log(answer);
}
