function solution(babbling) {
  let count = 0;
  const checkArray = ["aya", "ye", "woo", "ma"];
  babbling.forEach((word) => {
    checkArray.map((check) => (word = word.split(check).join("$")));
    word = word.split("$").join("");
    if (0 === word.length) count += 1;
  });
  return count;
}
