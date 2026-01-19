import fs from 'fs';
const writeStream = fs.createWriteStream('file.txt', { highWaterMark: 4 });

let i = 0;
write100A();
writeStream.on('drain', () => {
  console.log('Drain: ', writeStream.writableLength);
  write100A();
});

function write100A() {
  while (i < 1000) {
    console.log(writeStream.writableLength);
    let isEmpty = writeStream.write('a');
    i++;
    if (!isEmpty) {
      break;
    }
    console.log(isEmpty);
  }
}
