function solution(genres, plays) {
  const obj = {};
  const genreObj = {};

  genres.forEach((genre, index) => {
    //genreObj 저장
    if (genreObj[genre] === undefined) {
      genreObj[genre] = plays[index];
    } else {
      genreObj[genre] = genreObj[genre] + plays[index];
    }

    //오브젝트 생성
    const newObj = {};
    newObj["index"] = index;
    newObj["ea"] = plays[index];

    if (obj[genre] === undefined) {
      obj[genre] = [newObj];
    } else {
      for (let i = 0; i < obj[genre].length; i++) {
        if (obj[genre][i].ea < newObj["ea"]) {
          obj[genre].splice(i, 0, newObj);
          break;
        } else if (obj[genre].length - 1 === i) {
          obj[genre].push(newObj);
          break;
        }
      }
    }
  });

  const array = [];

  const convertGenreObj = Object.entries(genreObj);
  convertGenreObj.forEach((element) => {
    if (array.length === 0) {
      array.push(element);
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i][1] < element[1]) {
          array.splice(i, 0, element);
          break;
        } else if (array.length - 1 === i) {
          array.push(element);
          break;
        }
      }
    }
  });

  const answer = [];

  array.forEach((element) => {
    for (let i = 0; i < 2; i++) {
      if (obj[element[0]][i] !== undefined) {
        answer.push(obj[element[0]][i].index);
      }
    }
  });

  console.log(answer);
  return answer;
}
