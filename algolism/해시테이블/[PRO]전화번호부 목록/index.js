function solution(phone_book) {
  const hash = {};
  for (const number of phone_book) {
    hash[number] = true;
  }

  for (let nowNumber in hash) {
    for (let i = 0; i < nowNumber.length; i++) {
      const sliceNumber = nowNumber.slice(0, i);

      if (hash[sliceNumber]) return false;
    }
  }

  return true;
}
