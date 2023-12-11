function isUnique(...rest) {
  const obj = {};
  for (let i = 0; i < rest[0].length; i++) {
    let str = "";
    for (let j = 0; j < rest.length; j++) {
      str += rest[j][i];
    }

    if (obj[str]) return false;
    obj[str] = 1;
  }

  return true;
}

function isUniqueArr(arr1, arr2) {
  let cnt = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) cnt++;
  }

  return arr1.length === cnt;
}

function solution(relation) {
  const obj = {};
  const unique = [];

  // 각 인덱스 별로 분류
  for (let i = 0; i < relation.length; i++) {
    for (let j = 0; j < relation[i].length; j++) {
      if (!obj[j]) obj[j] = [];

      obj[j].push(relation[i][j]);
    }
  }

  // 모든 조합 생성
  const combination = [];
  let maxValue = Object.keys(obj).length;
  backtrack("", 0);

  function backtrack(current, next) {
    if (current.length > 0) {
      combination.push(current);
    }

    if (next > maxValue) {
      return;
    }

    for (let i = next; i < maxValue; i++) {
      backtrack(current + i, i + 1);
    }
  }

  for (let i = 0; i < combination.length; i++) {
    const arr = [];
    let isContinue = false;
    let uniqueKey = "";
    const split = combination[i].split("");

    for (let j = 0; j < split.length; j++) {
      uniqueKey += split[j];
      arr.push(obj[split[j]]);
    }
    if (isContinue) continue;

    if (isUnique(...arr)) unique.push(uniqueKey);
  }

  let cnt = 0;

  for (let key in unique) {
    let isTrue = true;

    for (let j = 0; j < unique.length; j++) {
      if (
        unique[key].length > unique[j].length &&
        isUniqueArr(unique[j].split(""), unique[key].split(""))
      ) {
        isTrue = false;
        break;
      }
    }

    if (isTrue) cnt++;
  }

  console.log(unique, cnt);
  return cnt;
}

solution([
  ["100", "ryan", "music", "2"],
  ["200", "apeach", "math", "2"],
  ["300", "tube", "computer", "3"],
  ["400", "con", "computer", "4"],
  ["500", "muzi", "music", "3"],
  ["600", "apeach", "music", "2"],
]);
