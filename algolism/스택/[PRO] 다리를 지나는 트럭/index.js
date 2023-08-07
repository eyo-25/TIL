function solution(bridge_length, weight, truck_weights) {
  // 지난시간
  let cnt = 0;
  let totalWeight = 0;
  const bridge = [];
  const outTrucks = [];
  const waitTrucks = [...truck_weights];

  while (outTrucks.length < truck_weights.length) {
    // 시간경과
    cnt++;
    for (let i = 0; i < bridge.length; i++) {
      const [weight, location] = bridge[i];
      // 위치 1더하기
      bridge[i] = [weight, location + 1];
    }
    // 출차
    if (bridge[0] && bridge_length <= bridge[0][1]) {
      totalWeight -= bridge[0][0];
      outTrucks.push(bridge[0][1]);
      bridge.shift();
    }

    //입차 = 다리위 전체무게 + 입차할차 무게가 다리하중보다 같거나 낮을때
    if (waitTrucks[0] && totalWeight + waitTrucks[0] <= weight) {
      totalWeight += waitTrucks[0];
      bridge.push([waitTrucks[0], 0]);
      waitTrucks.shift();
    }
  }

  return cnt;
}
