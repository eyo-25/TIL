const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

solution(input);

function solution(input) {
  // 개행문자 제거
  const strings = input.map((el) => el.replace(/\r/g, ""));
  strings.pop();
  const open = ["(", "["];
  const close = [")", "]"];
  const answer = [];

  strings.forEach((str) => {
    const stack = [];
    let isBalance = true;

    for (let i = 0; i < str.length; i++) {
      const letter = str[i];
      if (open.includes(letter)) {
        stack.push(letter);
      } else if (close.includes(letter)) {
        const pop = stack.pop(letter);
        if (pop !== open[close.indexOf(letter)]) {
          isBalance = false;
          break;
        }
      }
    }

    if (isBalance && stack.length === 0) {
      answer.push("yes");
    } else {
      answer.push("no");
    }
  });

  console.log(answer.join("\n"));
}
