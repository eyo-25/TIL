function solution(str1, str2) {
  const arr1 = str1.toUpperCase().split("");
  const arr2 = str2.toUpperCase().split("");
  const obj1 = {};
  const obj2 = {};
  const regax = /^[a-zA-Z]+$/;
  let intersection = 0;
  let union = 0;

  // 객체로 변환
  for (let i = 0; i < arr1.length - 1; i++) {
    const newStr = arr1[i] + arr1[i + 1];
    if (regax.test(newStr)) {
      obj1[newStr] = obj1[newStr] ? obj1[newStr] + 1 : 1;
    }
  }
  for (let i = 0; i < arr2.length - 1; i++) {
    const newStr = arr2[i] + arr2[i + 1];
    if (regax.test(newStr)) {
      obj2[newStr] = obj2[newStr] ? obj2[newStr] + 1 : 1;
    }
  }

  // 교집합
  for (const key in obj1) {
    union += obj1[key];
    if (obj2[key]) {
      intersection += obj1[key] <= obj2[key] ? obj1[key] : obj2[key];
    }
  }

  // 합집합
  for (const key in obj2) {
    // obj1에 요소가 없거나 값이 많을때 많은 만큼 더해준다.
    if (!obj1[key]) {
      union += obj2[key];
    } else if (obj1[key] < obj2[key]) {
      union += obj2[key] - obj1[key];
    }
  }

  //공집합
  if (intersection === union) return 65536;

  return Math.floor((intersection / union) * 65536);
}

console.log(solution("handshake", "shake hands"));
