const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0].split(" ");
input = input.map((item) => +item);

solution(input[0], input[1], input[2]);

function solution(one, two, tree) {
  if (one == two && one == tree && two == tree) {
    console.log(10000 + one * 1000);
    return;
  }

  if (one == two) {
    console.log(1000 + one * 100);
  } else if (one == tree) {
    console.log(1000 + one * 100);
  } else if (two == tree) {
    console.log(1000 + two * 100);
  }

  if (one !== two && one !== tree && two !== tree) {
    const maxNum = Math.max(one, two, tree);
    console.log(maxNum * 100);
  }
}
