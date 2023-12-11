function solution(today, terms, privacies) {
  const answer = [];
  const termObj = {};

  // today를 비교하기 위해서 숫자를 합친다.
  const todaySum = parseInt(today.split(".").join(""));

  // terms가 활용하기가 힘들기 때문에 객체로 정제한다.
  terms.forEach((element) => {
    const [alphabet, duration] = element.split(" ");
    termObj[alphabet] = +duration;
  });

  // privacies을 반복하며 유효기간 후의 시간을 생성하고 현재 시간과 비교
  privacies.forEach((element, index) => {
    const [date, alphabet] = element.split(" ");
    let [year, month, day] = date.split(".").map((item) => parseInt(item));
    let sumMonth = month + termObj[alphabet];
    // 유효기한은 유효기간일에서 하루전이고 0일이된 날은 전달로
    if (day === 1) {
      sumMonth--;
      day = 28;
    } else {
      day--;
    }
    // 12달이 넘어간 달 처리
    while (12 < sumMonth) {
      sumMonth = sumMonth - 12;
      year++;
    }
    // 0달이 된 경우 처리
    if (sumMonth === 0) {
      year--;
      sumMonth = 12;
    }
    // day 10보다 작은 수 0 붙이기
    if (day < 10) {
      day = "0" + day;
    }
    // month 10보다 작은 수 0 붙이기
    if (sumMonth < 10) {
      sumMonth = "0" + sumMonth;
    }
    // 날짜 총합
    const sumDays = parseInt(`${year}${sumMonth}${day}`);
    console.log(todaySum, sumDays);
    if (sumDays < todaySum) {
      answer.push(index + 1);
    }
  });

  return answer;
}
