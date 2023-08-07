function solution(clothes) {
  const hash = new Map();
  for (let i = 0; i < clothes.length; i++) {
    const [_, type] = clothes[i];
    const value = hash.get(type) ? hash.get(type) + 1 : 1;
    hash.set(type, value);
  }

  let result = 1;
  for (const [_, value] of hash) {
    result = (value + 1) * result;
  }

  return result - 1;
}

console.log(
  solution([
    ["yellow_hat", "headgear"],
    ["blue_sunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);
