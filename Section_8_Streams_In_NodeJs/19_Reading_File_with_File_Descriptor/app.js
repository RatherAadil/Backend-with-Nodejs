import fs from 'fs';

const fd = fs.openSync('file.txt');
const readBuffer = Buffer.alloc(10);

fs.read(
  fd,
  { buffer: readBuffer, position: 2, length: 5 },
  (err, bytesRead, buffData) => {
    console.log(fd);
    console.log(bytesRead);
    console.log(buffData.toString());
    console.log(buffData.byteLength);
  },
);
