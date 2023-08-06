function solution(m, musicinfos) {
  const musics = [];

  for (let i = 0; i < musicinfos.length; i++) {
    const info = musicinfos[i].split(",");
    let [start, end, name, sheet] = info;
    start = start.split(":").map((el) => Number(el));
    end = end.split(":").map((el) => Number(el));

    const sheetArr = [];
    for (let j = 0; j < sheet.length; j++) {
      if (sheet[j] === "#") {
        sheetArr[sheetArr.length - 1] += "#";
      } else {
        sheetArr.push(sheet[j]);
      }
    }

    const totalTime = end[0] * 60 + end[1] - (start[0] * 60 + start[1]);
    let record = [];
    let count = totalTime;

    while (0 < count) {
      if (sheetArr.length < count) {
        record.push(...sheetArr);
        count -= sheetArr.length;
      } else {
        record.push(...sheetArr.slice(0, count));
        break;
      }
    }
    musics.push({ record: record.join(""), totalTime, name });
  }

  let result = undefined;
  const pattern = m + `(?!#)`;
  const regex = new RegExp(pattern);

  for (let i = 0; i < musics.length; i++) {
    const record = musics[i].record;

    if (regex.test(record)) {
      //result 없을때
      if (!result) {
        result = musics[i];
        continue;
      }
      //result있을때
      if (result.totalTime < musics[i].totalTime) {
        result = musics[i];
        continue;
      }
      if (result.record.length === record.length) {
        if (result.totalTime < record.totalTime) {
          result = musics[i];
        }
      }
    }
  }

  if (!result) return "(None)";
  return result.name;
}

console.log(
  solution("ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"])
);
