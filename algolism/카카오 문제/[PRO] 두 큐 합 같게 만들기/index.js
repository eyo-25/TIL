function solution(queue1, queue2) {
  let max = queue1.length * 2 + 2;
  let sum1 = queue1.reduce((acc, cu) => acc + cu, 0);
  let sum2 = queue2.reduce((acc, cu) => acc + cu, 0);
  let pointer1 = 0;
  let pointer2 = 0;

  //실패 케이스 작업
  const sumArr = queue1.concat(queue2);
  const average = sumArr.reduce((acc, cu) => acc + cu, 0) / 2;

  if (average !== Math.floor(average)) return -1;

  let cnt = 0;
  while (true) {
    if (max < cnt) {
      cnt = -1;
      break;
    }

    if (sum1 === sum2) {
      break;
    }

    if (sum1 < sum2) {
      const pop2 = queue2[pointer2];

      queue1.push(pop2);
      sum1 += pop2;
      sum2 -= pop2;
      pointer2++;
    } else {
      const pop1 = queue1[pointer1];

      queue2.push(pop1);
      sum1 -= pop1;
      sum2 += pop1;
      pointer1++;
    }
    cnt++;
  }

  return cnt;
}

console.log(solution([1, 2, 1, 2], [1, 10, 1, 2]));
