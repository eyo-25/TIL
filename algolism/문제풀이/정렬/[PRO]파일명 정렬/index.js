function solution(files) {
  const sortArr = [];

  for (let i = 0; i < files.length; i++) {
    const head = files[i].split(/[^a-zA-Z .-]+/)[0].toUpperCase();
    const number = files[i]
      .split(/[^0-9]+/)
      .filter((el) => el !== "")[0]
      .slice(0, 5);

    const file = { head, number, index: i, name: files[i] };
    sortArr.push(file);
  }

  sortArr.sort((a, b) => {
    if (a.head !== b.head) return a.head.localeCompare(b.head);
    if (a.number !== b.number) return Number(a.number) - Number(b.number);
    return a.index - b.index;
  });

  const result = sortArr.reduce((acc, cu) => [...acc, cu.name], []);
  // console.log(result, sortArr);
  return result;
}

solution([
  "F-5 Freedom Fighter",
  "B-50 Superfortress",
  "A-10 Thunderbolt II",
  "F-14 Tomcat",
]);
