import { createReadStream, createWriteStream } from 'node:fs';
import net from 'node:net';

const socket = net.createConnection(
  { host: '10.50.206.27', port: 4000 },
  () => {
    console.log(
      'If you want to send a file to server:\nUse this convention, send-<path-to-file>\n',
    );
    console.log('Type: ');
  },
);

socket.once('data', (chunk) => {
  const [fileName, ...rest] = chunk.toString().split('\n');
  const filePath = fileName.trim();
  const writeStream = createWriteStream(filePath);
  writeStream.write(Buffer.from(rest.join('\n')));
  socket.pipe(writeStream);
});

socket.on('error', () => {
  console.log('Server Lost');
});

process.stdin.on('data', (input) => {
  const inputString = input.toString().trim();
  const isPath = inputString.startsWith('send-');

  if (isPath) {
    const path = inputString.split('-')[1];
    socket.write(path + '\n');

    const readStream = createReadStream(path);
    readStream.pipe(socket);

    readStream.on('error', (err) => {
      console.log(err.message, '\n\nType: ');
    });

    readStream.on('end', () => {
      console.log('File sent to server!\n');
      console.log('Disconnecting From Server...');
    });
  }
});
