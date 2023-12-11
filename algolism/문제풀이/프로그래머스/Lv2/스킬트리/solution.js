function solution(skill, skill_trees) {
  const obj = {};
  for (let i = 0; i < skill.length; i++) {
    const cu = skill[i];

    obj[cu] = i + 1;
  }
  let cnt = 0;

  for (let i = 0; i < skill_trees.length; i++) {
    const cu = skill_trees[i].split("");
    let isTrue = true;
    let lv = 0;

    for (let j = 0; j < cu.length; j++) {
      const cu_skill = cu[j];
      const cu_value = obj[cu_skill];

      if (cu_value) {
        if (lv + 1 === cu_value) {
          lv = cu_value;
        } else {
          isTrue = false;
          break;
        }
      }
    }

    if (isTrue) {
      cnt++;
    }
  }

  return cnt;
}
