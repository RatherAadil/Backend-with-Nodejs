import fs from 'fs';
console.time();
//TIME: 1.33s
for (let i = 1; i <= 5000; i++) {
  if (i === 1) {
    fs.writeFileSync('numbers.txt', `${i}, `);
  } else {
    fs.appendFileSync('numbers.txt', `${i}, `);
  }
}
console.timeEnd();
