//==== USING BUFFERS ====//
// import fs from 'node:fs/promises';
// const content = await fs.readFile('chars.txt', 'utf-8');
// console.time();

// Time: 193.703ms
// CPU: 2%
// Memory: 1226 MB's
// const contentBuffer = await fs.readFile(
//   'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
// );

// await fs.writeFile('contentBuff.mp4', contentBuffer);
// console.timeEnd();

//==== USING STREAMS ====//
import fs from 'fs';
// console.time();
// Time: 237.022ms
// CPU: 6%
// Memory: 12 MB's
// const readStream = fs.createReadStream(
//   'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
//   { highWaterMark: 1 * 1024 * 1024 },
// );
// let readCount = 0;
// readStream.on('data', (chunkBuffer) => {
//   //   console.log(chunkBuffer);
//   //   console.log(chunkBuffer.byteLength);
//   fs.appendFileSync('contentBuff.txt', chunkBuffer);
//   readCount++;
//   // if (chunkBuffer.byteLength < 1 * 1024 * 1024) {
//   //   console.timeEnd();
//   // }
// });

// readStream.on('end', () => {
//   console.timeEnd();
//   console.log(`Total Chunks: ${readCount}`);
// });

let stats = fs.statSync('contentBuff.mp4');
const fileSize = stats.size;
const readStream = fs.createReadStream('contentBuff.mp4', {
  highWaterMark: 1 * 1024 * 1024,
});
let bytesRead = 0;
readStream.on('data', (chunk) => {
  bytesRead += chunk.length;
  let progress = percentage(fileSize, bytesRead);
  console.log(`Progress: ${progress}%`);
});

const percentage = (fileSize, bytesRead) =>
  Math.floor((bytesRead * 100) / fileSize);

readStream.on('end', () => {
  console.log(`Total Chunks ${count}`);
});
