import fs from 'fs';
console.time();
//TIME: 28ms
const writeStream = fs.createWriteStream('streamNumbers.txt');
for (let i = 1; i <= 5000; i++) {
  writeStream.write(`${i}, `);
}
writeStream.end();

writeStream.on('finish', () => {
  console.timeEnd();
});
