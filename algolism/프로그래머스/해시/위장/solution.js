function solution(clothes) {
  const obj = {};
  clothes.forEach((array) => {
    const [name, kind] = array;
    obj[kind] !== undefined ? (obj[kind] = obj[kind] + 1) : (obj[kind] = 1);
  });
  let answer = 0;
  for (let key in obj) {
    answer === 0 ? (answer = obj[key] + 1) : (answer = answer * (obj[key] + 1));
  }
  return answer - 1;
}
