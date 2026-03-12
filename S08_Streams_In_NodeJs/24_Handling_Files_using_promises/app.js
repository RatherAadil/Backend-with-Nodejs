import fs from 'fs/promises';

const fileHandle = await fs.open('file.txt', 'r+');
const buff = await fileHandle.read();

const { buffer, bytesWritten } = await fileHandle.write('Hii');

console.log(buff);
console.log(buffer);
console.log(bytesWritten);

fileHandle.close();
