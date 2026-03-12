import fs from 'fs';
console.time();
const writeStream = fs.createWriteStream('stream.mp4');

const readStream = fs.createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  { highWaterMark: 1 * 1024 * 1024 },
);
readStream.on('data', (chunkBuffer) => {
  const isEmpty = writeStream.write(chunkBuffer);
  if (!isEmpty) {
    readStream.pause();
  }
});
writeStream.on('drain', () => {
  readStream.resume();
});
readStream.on('end', () => {
  console.timeEnd();
});
