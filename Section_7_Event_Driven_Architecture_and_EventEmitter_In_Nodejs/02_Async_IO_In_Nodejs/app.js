// import fsPromises from 'node:fs/promises';
import fs from 'fs';

setTimeout(() => {
  console.log('Hii');
}, 0);

//async I/O
// const fileContent = await fsPromises.readFile('file.txt', 'utf-8');

//Another way of Async I/O
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log(data);
});

//Sync I/O
// const fileContent = fs.readFileSync('file.txt', 'utf-8');
// console.log(fileContent);
