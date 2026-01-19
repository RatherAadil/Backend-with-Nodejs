import fs from 'fs';

const fd = fs.openSync('file.txt', 'w');

//writing a string in a file
// fs.write(fd, 'abc', (err, bytesWritten, dataWritten) => {
//   console.log(bytesWritten, dataWritten);
// });

//creating a buffer and writing that
// const buff = Buffer.from('123');
// fs.write(fd, buff, (err, bytesWritten, dataWritten) => {
//   console.log(bytesWritten, dataWritten);
// });

//writeSync()
const bytesWritten = fs.writeSync(fd, 'abc');
console.log(bytesWritten);
