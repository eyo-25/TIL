function solution(s) {
  const midLength = Math.floor(s.length / 2);
  let result = s.length;

  for (let unit = 1; unit <= midLength; unit++) {
    let copy = s;
    const arr = [];
    let compress = "";
    let memo = [0, ""];
    let last = "";

    for (let i = 0; i < s.length; i += unit) {
      arr.push(copy.substr(i, unit));
    }

    //마지막 처리
    if (arr[arr.length - 1].length < unit) {
      last = arr.pop();
    }

    //일단 마지막 빼고 생각
    for (let i = 0; i < arr.length; i++) {
      if (memo[1] === arr[i]) {
        memo[0] += 1;

        //마지막 바퀴 처리
        if (i === arr.length - 1) {
          compress = compress + memo[0] + memo[1];
        }
      } else {
        //문자 압축
        if (1 < memo[0]) {
          compress = compress + memo[0] + memo[1];
        } else if (memo[0] === 1) {
          compress += memo[1];
        }

        //메모 재배정
        memo = [1, arr[i]];
      }
    }

    if (memo[0] === 1) {
      compress += memo[1];
    }
    compress += last;
    // console.log(compress, arr, last);

    //최소값 갱신
    if (compress.length < result) result = compress.length;
  }

  // console.log(result);
  return result;
}

solution("aabbaccc");
