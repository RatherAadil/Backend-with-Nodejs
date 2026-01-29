import dgram from 'node:dgram'; //UDP

const socket = dgram.createSocket('udp4');

socket.on('message', (message, remoteAddress) => {
  console.log(message.toString());
  console.log(remoteAddress);
  socket.close();
});

socket.send('Hello from Client.js', 4000, '10.148.173.27');
