function solution(s) {
  let answer = true;
  const array = s.split("");
  const stack = [];

  array.forEach((element) => {
    if (element === "(") {
      stack.push(element);
    }
    if (element === ")") {
      const pop = stack.pop();
      if (pop === undefined) {
        answer = false;
      }
    }
  });

  return 0 < stack.length ? false : answer;
}
