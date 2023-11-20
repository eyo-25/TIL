function solution(n) {
  const max = Math.floor(n / 2);
  let cnt = 0;

  for (let i = 1; i <= max; i++) {
    let sum = i;

    for (let j = i + 1; j < n; j++) {
      sum += j;
      if (sum === n) {
        cnt++;
        break;
      }
      if (sum > n) {
        break;
      }
    }
  }

  return cnt + 1;
}
