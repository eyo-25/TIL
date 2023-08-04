function solution(record) {
  const log = [];
  const users = {};
  const output = [];
  const actionText = {
    Enter: "들어왔습니다.",
    Leave: "나갔습니다.",
  };

  // 데이터 저장
  for (let i = 0; i < record.length; i++) {
    const arr = record[i].split(" ");
    const action = arr[0];
    const uid = arr[1];
    //Leave는 name 없음
    const name = arr[2];

    switch (action) {
      case "Enter":
        log.push({ uid, action });
        users[uid] = name;
        break;
      case "Leave":
        log.push({ uid, action });
        break;
      case "Change":
        users[uid] = name;
        break;
    }
  }

  // 로그 출력
  for (let i = 0; i < log.length; i++) {
    const { uid, action } = log[i];
    output.push(`${users[uid]}님이 ${actionText[action]}`);
  }

  // console.log(output);
  return output;
}

solution([
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan",
]);
