import fs from 'fs';

const writeStream = fs.createWriteStream('file.txt', { highWaterMark: 4 });

writeStream.cork();

writeStream.write('hi');
writeStream.write('hi');
writeStream.write('hi');
writeStream.write('hi');

console.log(writeStream.writableCorked);
writeStream.uncork();
console.log(writeStream.writableCorked);
