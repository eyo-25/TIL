function solution(fees, records) {
  const basic = [fees[0], fees[1]];
  const unit = [fees[2], fees[3]];
  const recordsObj = {};
  const result = [];

  // 차량번호에 따라 입출차 정제
  for (let i = 0; i < records.length; i++) {
    const [time, number, content] = records[i].split(" ");
    const [hour, min] = time.split(":");
    const converTime = Number(hour) * 60 + Number(min);

    if (!recordsObj[number]) {
      recordsObj[number] = { in: [], out: [] };
    }

    if (content === "IN") {
      recordsObj[number]["in"].push(converTime);
    } else {
      recordsObj[number]["out"].push(converTime);
    }
  }

  //금액 계산
  for (let key in recordsObj) {
    let difTime = 0;
    // 입차반복
    for (let i = 0; i < recordsObj[key]["in"].length; i++) {
      // 출차기록이 있는 경우
      if (recordsObj[key]["out"][i]) {
        difTime += recordsObj[key]["out"][i] - recordsObj[key]["in"][i];
      } else {
        difTime += 1439 - recordsObj[key]["in"][i];
      }
    }

    // 금액계산
    let total = basic[1];
    const price = Math.ceil((difTime - basic[0]) / unit[0]) * unit[1];
    if (0 < price) total += price;

    result.push([Number(key), total]);
  }

  return result.sort((a, b) => a[0] - b[0]).map(([_, total]) => total);
}

solution([1, 461, 1, 10], ["00:00 1234 IN"]);
