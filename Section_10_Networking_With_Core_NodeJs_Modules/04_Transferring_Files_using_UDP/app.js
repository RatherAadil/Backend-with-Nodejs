import dgram from 'node:dgram'; //UDP
import { createWriteStream } from 'node:fs';
import { appendFile } from 'node:fs/promises';

const writeStream = createWriteStream('message.mp4');
const socket = dgram.createSocket('udp4');
socket.on('message', (message, remoteAddress) => {
  // appendFile('message.txt', message);
  if (message.toString() === 'EOF') {
    socket.send(
      'File uploaded successfully',
      remoteAddress.port,
      remoteAddress.address,
    );
  } else {
    writeStream.write(message, 'utf-8');
  }
});

socket.bind({ port: 4000 }, () => {
  console.log(socket.address());
  const address = socket.address();
  console.log(`Listening on port ${address.port}`);
});
