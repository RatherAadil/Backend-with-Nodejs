import dgram from 'node:dgram'; //UDP
import { createReadStream, statSync } from 'node:fs';
// import { readFile } from 'node:fs/promises';

const socket = dgram.createSocket('udp4');

socket.on('message', (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.close();
});

// const content = await readFile('./nums.txt', 'utf-8');
const { size } = statSync(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
);
let bytesRead = 0;

let percentage = (bytesRead, size) => Math.floor((bytesRead / size) * 100);
let lastPercentage = 0;

const readStream = createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  {
    highWaterMark: 1000,
  },
);

readStream.on('data', (chunk) => {
  bytesRead += chunk.length;
  socket.send(chunk, 4000, '10.148.173.27', () => {
    let percent = percentage(bytesRead, size);
    if (percent > lastPercentage) {
      lastPercentage = percent;
      console.log(`${percent}% Uploaded`);
    }
  });
});

readStream.on('end', () => {
  socket.send('EOF', 4000, '10.148.173.27');
});
