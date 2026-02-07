function sum(...nums) {
  return nums.reduce((curr, acc) => curr + acc);
}

module.exports = sum;
