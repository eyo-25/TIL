function solution(id_list, report, k) {
  const 신고내역 = {};
  const 제재명단 = {};
  const answer = [];
  report.forEach((element) => {
    const array = element.split(" ");
    let isReported = false;
    //프로퍼티 유무확인
    if (array[0] in 신고내역) {
      //신고내역에 등록된 신고인지 중복체크
      if (신고내역[array[0]].includes(array[1])) {
        isReported = true;
      } else {
        신고내역[array[0]].push(array[1]);
      }
    } else {
      신고내역[array[0]] = [array[1]];
    }
    //제재명단 생성
    if (!(array[1] in 제재명단)) {
      제재명단[array[1]] = 1;
    } else if (!isReported) {
      //중복이 아니면 추가
      제재명단[array[1]]++;
    }
  });

  //제재명단 기준미만 삭제
  for (let key in 제재명단) {
    if (제재명단[key] < k) {
      delete 제재명단[key];
    }
  }

  // 최종 결과 누적
  id_list.forEach((userName) => {
    let mailCount = 0;
    // 신고내역에서 제재명단에 이름이 있는 유저면 이메일 카운트 업
    if (Array.isArray(신고내역[userName])) {
      신고내역[userName].forEach((element) => {
        if (element in 제재명단) {
          mailCount++;
        }
      });
    }
    //메일카운트 결과에 누적
    answer.push(mailCount);
  });

  return answer;
}
