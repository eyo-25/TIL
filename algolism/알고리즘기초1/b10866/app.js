const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));
input.shift();

let deque = [];

const fn = {
  push: (cu) => {
    const [order, num] = cu.split(" ");
    if (order === "push_front") {
      deque.unshift(num);
    } else {
      deque.push(num);
    }
    return "";
  },
  pop_front: () => deque.shift() || -1,
  pop_back: () => deque.pop() || -1,
  size: () => deque.length,
  empty: () => (deque[0] ? 0 : 1),
  front: () => deque[0] || -1,
  back: () => deque[deque.length - 1] || -1,
};

const result = input.reduce((acc, cu) => {
  return acc + (fn[cu] ? `${fn[cu]()}\n` : fn.push(cu));
}, "");

console.log(result.trim());
