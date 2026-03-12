import fs from 'fs';
const readStream = fs.createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  { highWaterMark: 10 * 1024 * 1024 },
);
const writeStream = fs.createWriteStream('stream.mp4');
// readStream.on('data', (chunk) => {
//   const isEmpty = writeStream.write(chunk);
//   if (!isEmpty) {
//     readStream.pause();
//   }
// });
// writeStream.on('drain', () => {
//   readStream.resume();
// });
// writeStream.end();
readStream.pipe(writeStream);
setTimeout(() => {
  readStream.unpipe(writeStream);
}, 10);
