const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""))[0];

let array = input.split("");
let tagArray = [];

while (array.includes(">")) {
  const idx1 = array.findIndex((item) => item === "<");
  const idx2 = array.findIndex((item) => item === ">");
  tagArray.push(array.splice(idx1, idx2 - idx1 + 1, "@").join(""));
}

let array2 = array.join("").split("@");

let result1 = array2.reduce((acc, cur) => {
  let array3 = [];
  if (cur === "") {
    return acc + "@";
  } else {
    array3 = cur.split(" ");
    for (let i = 0; i < array3.length; i++) {
      array3[i] = array3[i].split("").reverse().join("");
    }
    return acc + `${array3.join(" ")}` + "@";
  }
}, "");

let result2 = result1.substr(0, result1.length - 1).split("");

while (tagArray.length) {
  const idx = result2.findIndex((item) => item === "@");
  const tag = tagArray.shift();
  result2.splice(idx, 1, tag).join("");
}

console.log(result2.join(""));
