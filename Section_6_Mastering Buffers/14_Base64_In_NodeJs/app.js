import fs from 'node:fs/promises';

// //Below code works same as ---> btoa()
// const a = await fs.readFile('data.txt', 'base64');
// console.log(a);

// //Below code works same as --->  atob()
// fs.writeFile('text.txt', 'YWJj', 'base64');

const img = await fs.readFile('./a.txt');
const a = img.toString();
// console.log(img);
fs.writeFile('a.png', a, 'base64');
