// import fs from 'node:fs';
// const content = fs.readFileSync('./index.html', 'utf-8');
// const content = contentBuffer.toString();
// console.log(content);

// fs.readFile('./index.html', (err, data) => {
//   const content = data.toString();
//   console.log(content);
// });
 
// console.log('End');

import fs from 'node:fs/promises';
const d = await fs.readFile('./index.html');

const content = d.toString();
console.log(content);

console.log('End');
