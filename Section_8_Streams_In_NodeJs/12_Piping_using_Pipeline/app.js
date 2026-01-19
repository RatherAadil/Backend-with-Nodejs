import fs from 'fs';
import { pipeline } from 'stream';
const readStream = fs.createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  { highWaterMark: 10 * 1024 * 1024 },
);
const writeStream = fs.createWriteStream('stream.mp4');

// readStream.pipe(writeStream);

// readStream.on('error', (err) => {
//   console.log(err);
// });

pipeline(readStream, writeStream, (err) => {
  console.log('Error :', err);
});
setTimeout(() => {
  readStream.destroy('Khatam');
}, 10);
setInterval(() => {
  console.log('HIii');
}, 100);
