import fs, { appendFileSync } from 'fs';

const readStream = fs.createReadStream('chars.txt', { highWaterMark: 4 });

let readCount = 0;
readStream.on('data', (chunk) => {
  readCount++;
  if (readCount === 1) {
    fs.writeFileSync('file.txt', chunk);
  } else {
    appendFileSync('file.txt', chunk);
  }
  //   console.log(chunk.toString());
  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 100);
});

readStream.on('pause', () => {
  console.log('Stream Paused');
});
readStream.on('resume', () => {
  console.log('Stream Resumed');
});

// readStream.on('end', () => {
//   console.log(readStream.readableFlowing);
//   console.log(readStream.readableEnded);
//   console.log(readStream.isPaused());
// });
