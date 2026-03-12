import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';

const fileData = await readFile(
  'D:\\Front End Development Course\\React\\0.The Complete React Course  Trailer  Zero to Advanced.mp4',
);

// const hash = crypto.createHash('sha256').update('Hello World').digest('hex');
const hash = crypto.createHash('sha256').update(fileData).digest('hex');
console.log(hash);
