const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

input = input[0];
solution(input);

function solution(input) {
  let str = input.toString();
  const array = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="];
  const array2 = new Array(26)
    .fill()
    .map((_, i) => String.fromCharCode(i + 97));

  let minus = 0;

  let check = (s, type) => {
    let regex = new RegExp(`${s}`, "g");
    let count = 0;
    if (str.match(regex)) {
      count = str.match(regex).length;
    }
    if (type === "cro") {
      if (s == "dz=" || s == "lj" || s == "nj") {
        minus += 2 * count;
      } else {
        minus += 1 * count;
      }
    }
    return count;
  };

  let num1 = array2.reduce((acc, cur) => {
    let result = 0;
    if (input.includes(cur)) {
      result = check(cur.toString(), "apb");
    }
    return acc + result;
  }, 0);

  let num2 = array.reduce((acc, cur) => {
    let result = 0;
    if (input.includes(cur)) {
      result = check(cur.toString(), "cro");
    }
    return acc + result;
  }, 0);

  console.log(num1 + num2 - minus);
}
