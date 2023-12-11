function solution(participant, completion) {
  const obj = {};
  participant.forEach((name) => {
    obj[name] !== undefined ? (obj[name] = obj[name]++) : (obj[name] = 0);
  });
  completion.forEach((name) => {
    0 < obj[name] ? obj[name]-- : delete obj[name];
  });
  return Object.keys(obj)[0];
}
