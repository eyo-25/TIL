function solution(orders, course) {
  // 각 오더별 백트레킹으로 모든 경우의 수 memo에 저장
  const memo = {};

  for (let i = 0; i < orders.length; i++) {
    backtrack(orders[i]);
  }

  function backtrack(str) {
    const stack = [];

    stack.push(["", 0]);

    while (stack.length) {
      let [combi, start] = stack.pop();
      combi = combi
        .split("")
        .sort((a, b) => a.localeCompare(b))
        .join("");

      if (2 <= combi.length) {
        if (memo[combi]) {
          memo[combi] = memo[combi] + 1;
        } else {
          memo[combi] = 1;
        }
      }

      for (let j = start; j < str.length; j++) {
        stack.push([combi + str[j], j + 1]);
      }
    }
  }

  const result = {};
  for (let i = 0; i < course.length; i++) {
    result[course[i]] = [];
  }

  const memoArr = Object.keys(memo);
  for (let i = 0; i < memoArr.length; i++) {
    const key = memoArr[i];
    const value = memo[key];
    const length = key.length;

    // 필요한 코스수의 글자일때
    if (result[length] && 1 < value) {
      // 현재 결과에 글자 저장안되어 있을때
      if (result[length].length <= 0) {
        result[length] = [key];
        continue;
      }
      // 현재 결과에 글자 저장되어 있을때
      const maxValueStr = result[length][0];
      if (value === memo[maxValueStr]) result[length].push(key);
      if (memo[maxValueStr] < value) result[length] = [key];
    }
  }
  // console.log(memo);
  const result2 = Object.values(result).reduce((acc, cu) => acc.concat(cu), []);
  // console.log(result2.sort((a, b) => a.localeCompare(b)));
  return result2.sort((a, b) => a.localeCompare(b));
}

solution(["XYZ", "XWY", "WXA"], [2, 3, 4]);
