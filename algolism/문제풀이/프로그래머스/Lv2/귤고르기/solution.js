function solution(k, tangerine) {
  const obj = {};
  for (let i = 0; i < tangerine.length; i++) {
    const cu = tangerine[i];
    obj[cu] ? (obj[cu] = obj[cu] + 1) : (obj[cu] = 1);
  }

  const arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }

  let cnt = 0;
  let sum = 0;
  arr.sort((a, b) => b - a);
  for (let i = 0; i < arr.length; i++) {
    const cu = arr[i];
    sum += cu;
    cnt++;

    if (k <= sum) {
      break;
    }
  }

  return cnt;
}
