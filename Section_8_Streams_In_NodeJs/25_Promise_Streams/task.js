import fs from 'fs/promises';
const readFileHandle = await fs.open(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
);
const writeFileHandle = await fs.open('streams.mp4', 'w');

const readStream = readFileHandle.createReadStream();
const writeStream = writeFileHandle.createWriteStream();

readStream.pipe(writeStream);
