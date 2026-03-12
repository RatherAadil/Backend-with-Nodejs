const nums = [2, 4, 6, 5];

const digitsToNumber = (nums) => {
  let ans = 0;
  let multiply = 1;
  for (let i = 0; i < nums.length; i++) {
    ans += nums[i] * Math.pow(10, i);
  }
  return ans;
};
const result = digitsToNumber(nums);
console.log(result);
