function solution(nums) {
  const maxNum = nums.length / 2;
  nums = [...new Set(nums)];
  if (nums.length < maxNum) {
    return nums.length;
  } else {
    return maxNum;
  }
}
