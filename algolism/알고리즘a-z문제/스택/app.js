function solution(input) {
  const array = input.split("");
  const stack = [];

  for (let i = 0; i < array.length; i++) {
    const slice = array[i];
    if (slice === "(") {
      stack.push(slice);
    } else {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }

  return 0 < stack.length ? false : true;
}
