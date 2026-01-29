import net from 'node:net';
const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    console.log(chunk.toString());
    socket.write('Got your message.');
  });
  socket.on('close', () => {
    console.log(`${socket.remoteAddress}: Client disconnected`);
  });
  socket.on('error', () => {
    console.log('Client Lost');
  });
  console.log(socket.address());
  console.log(socket.remoteAddress);
  console.log('Client connected', socket.remoteAddress);
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
