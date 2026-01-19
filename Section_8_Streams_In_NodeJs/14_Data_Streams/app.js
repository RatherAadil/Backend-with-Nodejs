//Readable Stream
// console.log(process.stdin);

//Writable Streams
// console.log(process.stdout);
// console.log(process.stderr);

// process.stdout.write('Hello\n');
// process.stderr.write('Error');

import fs from 'fs';
const writeStream = fs.createWriteStream('output.txt');
// process.stdin.on('data', (chunk) => {
//   writeStream.write(chunk);
// });
//or
process.stdin.pipe(writeStream);
