function solution(number, k) {
  const stack = [];
  const arr = number.split("");
  let count = 0;

  arr.forEach((num) => {
    while (0 < stack.length && stack[stack.length - 1] < num && count < k) {
      count++;
      stack.pop();
    }
    stack.push(num);
  });

  while (count < k) {
    stack.pop();
    count++;
  }

  return stack.join("");
}
