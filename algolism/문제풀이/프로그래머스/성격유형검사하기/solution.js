function solution(survey, choices) {
  var answer = "";
  const score = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
  const choiceScore = [3, 2, 1, 0, 1, 2, 3];

  //선택지별 점수 부여
  for (let i = 0; i < choices.length; i++) {
    const aType = survey[i][0];
    const bType = survey[i][1];
    const choice = choices[i];
    if (choice < 4) {
      score[aType] = score[aType] + choiceScore[choice - 1];
    } else {
      score[bType] = score[bType] + choiceScore[choice - 1];
    }
  }

  //성격도출
  let personality = ["RT", "CF", "JM", "AN"];
  for (let i = 0; i < personality.length; i++) {
    let aType = personality[i][0];
    let bType = personality[i][1];
    if (score[aType] === score[bType]) {
      answer = answer + aType;
      continue;
    }
    if (score[aType] > score[bType]) {
      answer = answer + aType;
    } else {
      answer = answer + bType;
    }
  }

  return answer;
}
