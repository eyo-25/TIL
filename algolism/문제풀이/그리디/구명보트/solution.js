function solution(people, limit) {
  const stack = [];
  let count = 0;
  let pointer = 0;

  people.sort((a, b) => b - a);
  const copy = people.slice();
  for (let i = 0; i < people.length; i++) {
    count++;
    pointer++;
    // console.log(copy[copy.length - 1],people[i])

    if (copy[copy.length - 1] + people[i] <= limit) {
      copy.pop();
    }

    // console.log(pointer, copy.length)
    if (copy.length <= pointer) break;
  }

  return count;
}
