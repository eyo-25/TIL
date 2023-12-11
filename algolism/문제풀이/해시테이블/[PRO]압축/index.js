function solution(msg) {
  const dic = {};
  const result = [];

  for (let i = 0; i < 26; i++) {
    const alphabet = String.fromCharCode(65 + i);
    dic[alphabet] = i + 1;
  }

  while (msg.length) {
    for (let i = 0; i < msg.length; i++) {
      const letter = msg.slice(0, msg.length - i);
      const nextLetter = msg[msg.length - i];

      // 사전에 조회가 된 경우
      if (dic[letter]) {
        // 사전등록
        dic[letter + nextLetter] = Object.keys(dic).length + 1;
        // 결과 출력
        result.push(dic[letter]);
        // 출력된 인풋 메세지를 제외하고 재할당
        const newMsg = msg.slice(msg.length - i);
        msg = newMsg;
        break;
      }
    }
  }

  // console.log(result);

  return result;
}

solution("TOBEORNOTTOBEORTOBEORNOT");
