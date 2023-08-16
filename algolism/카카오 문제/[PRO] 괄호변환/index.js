function solution(p) {
  if (p === "") {
    return "";
  }

  let open = 0;
  let close = 0;
  let balancedIndex = 0;

  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") {
      open++;
    } else {
      close++;
    }

    if (open === close) {
      balancedIndex = i;
      break;
    }
  }

  const u = p.slice(0, balancedIndex + 1);
  const v = p.slice(balancedIndex + 1);

  if (isVaild(u)) {
    return u + solution(v);
  } else {
    let newStr = "(" + solution(v) + ")";
    const arr = u.slice(1, u.length - 1);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "(") {
        newStr += ")";
      } else {
        newStr += "(";
      }
    }

    return newStr;
  }
}

function isVaild(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      stack.push("(");
    } else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}

solution("()))((()");
