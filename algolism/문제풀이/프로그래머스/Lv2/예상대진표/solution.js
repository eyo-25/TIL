function solution(n, a, b) {
  let arr = Array.from({ length: n }, (_, i) => i + 1);
  let answer = 0;

  while (true) {
    let halfIdx = arr.length / 2;
    if (halfIdx % 2 !== 0) {
      halfIdx++;
    }
    const halfNum = arr[halfIdx - 1];

    if (arr.length === 2) {
      answer = 1;
      break;
    }

    if (a <= halfNum && b <= halfNum) {
      arr = arr.slice(0, halfIdx);
    } else if (a > halfNum && b > halfNum) {
      arr = arr.slice(halfIdx);
    } else {
      answer = Math.log2(arr.length);
      break;
    }
  }

  return answer;
}
