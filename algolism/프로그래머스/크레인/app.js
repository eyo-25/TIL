function solution(board, moves) {
  var answer = 0;
  const bucket = [];

  for (let move = 0; move < moves.length; move++) {
    const col = moves[move] - 1;
    for (let row = 0; row < board.length; row++) {
      const pick = board[row][col];
      if (pick !== 0) {
        board[row][col] = 0;
        if (bucket[bucket.length - 1] === pick) {
          bucket.pop();
          answer += 2;
        } else {
          bucket.push(pick);
        }
        break;
      }
    }
  }

  return answer;
}
