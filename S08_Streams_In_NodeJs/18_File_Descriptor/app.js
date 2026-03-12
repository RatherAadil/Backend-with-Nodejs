import fs from 'fs';
// fs.open('file.txt', (err, fd) => {
//   console.log(fd);
// });

const fd1 = fs.openSync('file.txt');
const fd2 = fs.openSync('file.txt');
const fd3 = fs.openSync('file.txt');

console.log(fd1, fd2, fd3);
