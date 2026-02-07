let octalNumber = 0o12;
let octalNumber2 = 0o237;

const decimalToAnyNumberSystem = (number, radix = 10) => {
  return number.toString(radix);
};

console.log(decimalToAnyNumberSystem(15, 8)); // "17"
console.log(decimalToAnyNumberSystem(15, 2)); // "1111"
console.log(decimalToAnyNumberSystem(15, 16)); // "f"
