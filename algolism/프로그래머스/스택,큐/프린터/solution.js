function solution(priorities, location) {
  const array = priorities;
  array[location] = `${array[location]}`;
  let printCount = 0;

  let isTrue = true;
  while (isTrue) {
    const maxNum = Math.max(...array);
    const pop = array.shift();

    if (typeof pop === "string") {
      if (maxNum === Number(pop)) {
      }
    }

    if (maxNum === pop || maxNum === Number(pop)) {
      if (typeof pop === "string") {
        isTrue = false;
      }
      printCount++;
    } else {
      array.push(pop);
    }
  }

  return printCount;
}
