import fs from 'fs/promises';

const fileHandle = await fs.open('file.txt', 'w+');
const readStream = fileHandle.createReadStream();
const writeStream = fileHandle.createWriteStream();
writeStream.write('Hii');
readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
