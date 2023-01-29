const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
input = input.map((item) => item.replace(/\r/g, ""));

let lStack = input.shift().split("");
let rStack = [];
const inter = +input.shift();

const fn = {
  L: () => {
    const pop = lStack.pop();
    if (pop) {
      rStack.push(pop);
    }
  },
  D: () => {
    const pop = rStack.pop();
    if (pop) {
      lStack.push(pop);
    }
  },
  B: () => lStack.pop(),
  P: (order) => {
    const add = `${order.split(" ")[1]}`;
    lStack.push(add);
  },
};

for (let i = 0; i < inter; i++) {
  const order = input[i];
  fn[order] ? fn[order]() : fn.P(order);
}

console.log(lStack.join("") + rStack.reverse().join(""));
