import fs from 'fs';
const writeStream = fs.createWriteStream('file.txt', { highWaterMark: 4 });

writeStream.write('a');
writeStream.write('a');
writeStream.write('a');
writeStream.end('Hi, Aadil this side'); //It also writes
// writeStream.write('a');
writeStream.on('finish', () => {
  console.log('Finished...');
});
