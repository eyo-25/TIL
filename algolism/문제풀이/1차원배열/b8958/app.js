const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");
// let input = fs.readFileSync(0).toString().trim().split("\n");
// 런타임 오류로 파일에 0 넣어야됨

const length = +input[0];

let add = 0;
for (let i = 1; i < length + 1; i++) {
  const array = input[i].trim().split("");
  const result = array.reduce((acc, cur) => {
    if (cur === "O") {
      add += 1;
      return acc + add;
    } else {
      add = 0;
      return acc;
    }
  }, 0);
  add = 0;
  console.log(result);
}
