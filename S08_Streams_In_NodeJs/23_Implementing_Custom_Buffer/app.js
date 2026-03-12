import fs from 'fs';

console.time();

const buff = Buffer.allocUnsafe(10);

// Time 310ms
// Time 24ms with custom internal buffer
const fd = fs.openSync('numbers.txt', 'w');

let totalBytesWrittenInBuffer = 0;
let remainingStr = '';

for (let i = 1; i <= 100000; i++) {
  let str = `${i}, `;
  str = remainingStr + str;
  const bytesWritten = buff.write(str, totalBytesWrittenInBuffer);
  remainingStr = '';

  const writtenBytesDiff = str.length - bytesWritten;
  if (writtenBytesDiff !== 0) {
    remainingStr += str.slice(bytesWritten);
  }
  totalBytesWrittenInBuffer += bytesWritten;

  if (totalBytesWrittenInBuffer === buff.byteLength) {
    fs.writeSync(fd, buff);
    totalBytesWrittenInBuffer = 0;
  }
  // fs.writeSync(fd, `${i}, `);
}

fs.writeSync(fd, buff.subarray(0, totalBytesWrittenInBuffer) + remainingStr);

fs.closeSync(fd);
console.timeEnd();
