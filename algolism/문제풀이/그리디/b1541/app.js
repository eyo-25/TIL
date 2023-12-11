const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, road, price] = input;
road = road.split(" ").map((el) => BigInt(el));
price = price.split(" ").map((el) => BigInt(el));

solution(n, road, price);

function solution(n, road, price) {
  let payments = 0n;
  let cheaperPrice = price[0];

  for (let i = 0; i < road.length; i++) {
    // 싼 가격 갱신
    if (price[i] < cheaperPrice) {
      cheaperPrice = price[i];
    }
    payments += road[i] * cheaperPrice;
  }

  let 변수 = 2;
  console.log(Number(BigInt(1) + BigInt(변수)));
}
