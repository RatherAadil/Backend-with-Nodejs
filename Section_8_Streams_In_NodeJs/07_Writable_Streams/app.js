import fs from 'fs';
const writeStream = fs.createWriteStream('stream.mp4');
// writeStream.write('ABC');
// writeStream.write('abc');
// writeStream.write('123');

console.time();
// Time: 173ms
// CPU: 10%
// Memory: 20MB's
const readStream = fs.createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  { highWaterMark: 1 * 1024 * 1024 },
);
readStream.on('data', (chunkBuffer) => {
  writeStream.write(chunkBuffer);
});

readStream.on('end', () => {
  console.timeEnd();
});
