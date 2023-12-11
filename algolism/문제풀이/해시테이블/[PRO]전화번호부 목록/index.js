function solution(s) {
  const open = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const close = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const arr = s.split("");
  const size = arr.length;
  let result = 0;
  let front = 0;

  for (let i = 0; i < size; i++) {
    const shift = arr[front];
    arr.push(shift);
    front++;
    result += checker(arr);
  }

  function checker(arr) {
    const stack = [];
    for (let i = front; i < arr.length + front; i++) {
      if (open[arr[i]]) {
        // 여는 괄호일때
        stack.push(arr[i]);
      } else {
        // 닫는 괄호일때
        const pop = stack.pop();
        if (pop !== close[arr[i]]) {
          return 0;
        }
      }
    }

    return 1;
  }

  // console.log(result);
  return result;
}

solution("}}}");
