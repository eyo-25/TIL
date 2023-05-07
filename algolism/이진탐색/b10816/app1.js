const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, arr, M, findArr] = input.map((el) => el.trim().split(" ").map(Number));
const hash = {};
arr.forEach((el) => (hash[el] ? hash[el]++ : (hash[el] = 1)));
const answer = [];
findArr.forEach((el) => answer.push(hash[el] ? hash[el] : 0));

console.log(answer.join(" "));
