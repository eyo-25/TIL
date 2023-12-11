const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(string) {
  const stringArray = string.split("");
  const array = new Array(26).fill().map((_, i) => String.fromCharCode(i + 97));

  let result = array.reduce((acc, cur) => {
    const index = stringArray.findIndex((item) => item === cur);
    return acc + " " + `${index}`;
  }, "");
  console.log(result.substring(1));
}
