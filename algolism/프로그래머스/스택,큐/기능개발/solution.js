function solution(progresses, speeds) {
  let answer = [];
  let finishWork = 0;

  while (finishWork < progresses.length) {
    // 속도에 따른 퍼센트 적용
    progresses.forEach((percent, index) => {
      progresses[index] = percent + speeds[index];
    });

    // 작업이 끝난 것 카운트
    let finishCount = 0;
    for (let i = finishWork; i < progresses.length; i++) {
      if (100 <= progresses[i]) {
        finishCount++;
      } else {
        break;
      }
    }

    //배포가 된 작업이 있으면 결과에 적용
    if (finishCount !== 0) {
      answer.push(finishCount);
      finishWork += finishCount;
    }
  }

  console.log(answer);
  return answer;
}
