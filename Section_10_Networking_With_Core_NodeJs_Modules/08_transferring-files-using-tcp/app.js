import { createReadStream, createWriteStream } from 'node:fs';
import net from 'node:net';

const clientsList = [];

const server = net.createServer((socket) => {
  clientsList.push(socket);
  console.log(clientsList.length);

  socket.once('data', (chunk) => {
    const [fileName, ...rest] = chunk.toString().split('\n');
    const filePath = +socket.remotePort + fileName.trim();
    const writeStream = createWriteStream(filePath);
    writeStream.write(Buffer.from(rest.join('\n')));
    socket.pipe(writeStream);

    socket.on('end', () => {
      writeStream.end();
      console.log(
        `File ${filePath} received fully from client ${socket.remotePort}`,
      );
      clientsList.forEach((client) => {
        if (client === socket) return;
        client.write(filePath + '\n');
        const readStream = createReadStream(filePath);
        readStream.pipe(client, { end: false });
      });
    });
  });

  socket.on('close', () => {
    console.log(socket.remotePort, ': Client disconnected');
  });

  socket.on('error', () => {
    console.log('Client Lost');
  });
  console.log('Client Connected', socket.remoteAddress, socket.remotePort);
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
