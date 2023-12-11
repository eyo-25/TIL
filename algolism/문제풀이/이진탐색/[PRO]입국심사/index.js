function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n;
  let mid = Math.floor((left + right) / 2);
  let result = right;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // 시간안에 사람이 얼마나 통과할 수 있는지 체크
    let person = 0;
    for (let i = 0; i < times.length; i++) {
      person += Math.floor(mid / times[i]);
    }

    if (n <= person) {
      right = mid - 1;
      result = mid;
    } else {
      left = mid + 1;
    }
  }

  console.log(result);
  return result;
}

solution(59, [1, 1]);
