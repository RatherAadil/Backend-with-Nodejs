import { writeFile } from 'node:fs/promises';

//Task: create a nodejs program that writes the time to the txt file contnuesly.

setInterval(() => {
  writeFile('./time.txt', new Date().toLocaleTimeString());
}, 500);
