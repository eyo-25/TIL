const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  let width = input[0] * 100; //나중에 곂친면 빼서 출력
  let close = 0; //곂친면
  let array = Array.from({ length: 100 }, () => Array(100).fill(0));
  let array2 = [];
  for (let i = 1; i < input.length; i++) {
    array2.push(input[i].split(" ").map((item) => +item));
  }
  for (let i = 0; i < array.length; i++) {
    for (let i2 = 0; i2 < array[i].length; i2++) {
      let count = 0;
      let y = i;
      let x = i2;
      for (let i3 = 0; i3 < array2.length; i3++) {
        let array3 = array2[i3];
        let inputY = array3[1];
        let inputX = array3[0];
        let isY = inputY <= y && y <= inputY + 9;
        let isX = inputX <= x && x <= inputX + 9;
        if (isY && isX && count === 0) {
          count += 1;
        } else if (isY && isX && 1 === count) {
          close += 1;
        }
      }
    }
  }
  console.log(width - close);
}

// 3
// 3 7
// 15 7
// 5 2
