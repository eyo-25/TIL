function solution(new_id) {
  var answer = "";
  const array = new_id.split("");

  for (let i = 0; i < new_id.length; i++) {
    const letter = array[i];
    //6단계
    if (answer.length === 15) {
      break;
    }
    //1단계 2단계
    if (letter.match(/[a-zA-Z0-9_-]/g)) {
      answer += letter.toLowerCase();
      continue;
    }
    //3단계 4단계
    if (
      letter.match(/[.]/g) &&
      answer[answer.length - 1] !== "." &&
      answer.length !== 0
    ) {
      answer += letter;
    }
  }

  //4단계 마지막점제거
  if (answer[answer.length - 1] === ".") {
    answer = answer.slice(0, -1);
  }

  //5단계
  if (answer === "") {
    answer = "a";
  }

  //7단계
  while (answer.length <= 2) {
    answer += answer[answer.length - 1];
  }

  return answer;
}
