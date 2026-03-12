import { appendFile } from 'node:fs/promises';
import { readFile, writeFile } from 'node:fs/promises';

//Task 1: Read the contents of a file and write it to another file

// const contentBuffer = await readFile('./file.txt');
// writeFile('file-1.txt', contentBuffer);
// console.log(contentBuffer);

//Task 2: Read the image and write it to the desktop
try {
  const imageBuffer = await readFile('./imagess.png');
  writeFile('C:\\Users\\ADIL\\Desktop\\image.png', imageBuffer);
} catch (err) {
  appendFile(
    'error.log',
    `\\n${new Date().toLocaleTimeString()}\n${err.message}\n${err.stack}`
  );
}
