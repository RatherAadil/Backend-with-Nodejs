import { createReadStream, createWriteStream } from 'node:fs';
import { open } from 'node:fs/promises';
import net from 'node:net';

const server = net.createServer(async (socket) => {
  const fileHandle = await open('D:\\KU SONZAL\\VID_20251127_155325.mp4');
  const { size } = await fileHandle.stat();
  const readStream = fileHandle.createReadStream();

  socket.write('HTTP/1.1 200 OKAY\n');
  socket.write(`Content-Length:${size}\n`);
  socket.write('Content-Type:video/mp4\n');
  socket.write('Content-Disposition:attachment;filename=sonzal.mp4');
  socket.write('\n\n');

  //slowdown the stream
  // readStream.on('data', (chunk) => {
  //   socket.write(chunk);
  //   readStream.pause();
  //   setTimeout(() => {
  //     readStream.resume();
  //   }, 10);
  // });

  //Handling backpressure manually
  // socket.on('data', (chunk) => {
  //   const isEmpty = socket.write(chunk);
  //   if (!isEmpty) {
  //     readStream.pause();
  //   }
  // });
  // socket.on('drain', () => {
  //   readStream.resume();
  // });

  readStream.pipe(socket);
  socket.on('pause', () => {
    console.log('readStream paused by browser');
  });
  socket.on('resume', () => {
    console.log('readStream resumed by browser');
  });

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
