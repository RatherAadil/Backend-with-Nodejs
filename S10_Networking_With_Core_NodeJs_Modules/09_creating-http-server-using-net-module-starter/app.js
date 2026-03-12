import { createReadStream, createWriteStream } from 'node:fs';
import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('HTTP/1.1\n\n');
  const readStream = createReadStream('river.webp');
  readStream.pipe(socket);
  socket.on('end', () => {
    console.log('File send successfully');
  });

  socket.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  socket.on('close', () => {
    console.log(socket.remoteAddress, ': Client disconnected');
  });

  socket.on('error', () => {
    console.log('Client Lost');
  });
  console.log('Client Connected', socket.remoteAddress);
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
