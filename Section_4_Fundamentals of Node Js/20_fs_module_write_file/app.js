import fs from 'node:fs/promises';
// fs.writeFile('./file.txt', 'Hello');

fs.appendFile('./file.txt', '\nWorld');
