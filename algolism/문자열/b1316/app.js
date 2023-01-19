const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  let count = +input.shift();
  let wordArray = input.map((item) => item.split("\r").join(""));

  wordArray.map((word) => {
    let findArray = word.split("");
    let letterArray = [...new Set(word.split(""))];
    let isGroup = true;
    for (let i = 0; i < letterArray.length; i++) {
      const letterLeng = findArray.filter((e) => e === letterArray[i]).length;
      if (1 < letterLeng) {
        const repeatLeng = letterArray[i].repeat(letterLeng);
        if (!word.includes(repeatLeng)) {
          isGroup = false;
          break;
        }
      }
    }
    if (!isGroup) {
      count -= 1;
    }
  });
  console.log(count);
}
