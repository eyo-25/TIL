function solution(numbers, hand) {
  hand = hand[0] === "r" ? "R" : "L";
  let h = { L: [1, 1], R: [1, 1] };
  let position = [1, 4, 4, 4, 3, 3, 3, 2, 2, 2];

  return numbers
    .map((num) => {
      if (/[147]/.test(num)) {
        h.L = [position[num], 1];
        return "L";
      }
      if (/[369]/.test(num)) {
        h.R = [position[num], 1];
        return "R";
      }
      // 중간 키패드 눌렀을때
      let distL = Math.abs(position[num] - h.L[0]) + h.L[1];
      let distR = Math.abs(position[num] - h.R[0]) + h.R[1];

      if (distL === distR) {
        h[hand] = [position[num], 0];
        return hand;
      }

      if (distL < distR) {
        h.L = [position[num], 0];
        return "L";
      } else {
        h.R = [position[num], 0];
        return "R";
      }
    })
    .join("");
}
