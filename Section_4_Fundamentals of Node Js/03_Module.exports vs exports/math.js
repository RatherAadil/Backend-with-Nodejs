function sum(...nums) {
  return nums.reduce((curr, acc) => curr + acc);
}
function product(...nums) {
  return nums.reduce((curr, acc) => curr * acc);
}

const user = {
  name: 'Aman Mishra',
  age: 88,
  address: { city: 'Mumbai', state: 'Maharashtra' },
  hobbies: ['Sleeping', 'Coding', 'Eating'],
};
let address = user.address;
console.log(user.address === address);

module.exports = {
  sum,
  product,
};
