const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));
input.shift();

let queue = [];

const fn = {
  push: (cu) => {
    queue.push(cu.split(" ")[1]);
    return "";
  },
  pop: () => queue.shift() || -1,
  top: () => queue[queue.length - 1] || -1,
  size: () => queue.length,
  empty: () => (queue[0] ? 0 : 1),
  front: () => (queue[0] ? queue[0] : -1),
  back: () => (queue[queue.length - 1] ? queue[queue.length - 1] : -1),
};

const result = input.reduce((acc, cu) => {
  return acc + (fn[cu] ? `${fn[cu]()}\n` : fn.push(cu));
}, "");

console.log(result.trim());
