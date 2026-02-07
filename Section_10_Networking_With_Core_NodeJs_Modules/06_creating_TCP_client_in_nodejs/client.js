import net from 'node:net';

const socket = net.createConnection({ port: 4000, host: '10.148.173.27' });

socket.on('data', (chunk) => {
  console.log(chunk.toString());
});

socket.on('error', () => {
  console.log('Server Lost');
});
socket.write('Hiii');
