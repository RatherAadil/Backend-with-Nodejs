import net from 'node:net';

let username = '';
let isUsernameSet = false;
let isConnected = false;

const socket = net.createConnection(
  { port: 4000, host: '10.50.206.27' },
  () => {
    isConnected = true;
    console.log('Connected to server');
    process.stdout.write('Enter your username: ');
  },
);

process.stdin.on('data', (input) => {
  const text = input.toString().trim();

  if (!isConnected) {
    console.log('Connecting... please wait');
    return;
  }

  if (!isUsernameSet) {
    username = text;
    isUsernameSet = true;

    socket.write(`${username}\n`);
    console.log(`Welcome, ${username}! You can start chatting now.`);
    return;
  }

  socket.write(text + '\n');
});

socket.on('data', (chunk) => {
  console.log(chunk.toString().trim());
});

socket.on('error', (err) => {
  console.log('Server error:', err.message);
});

socket.on('close', () => {
  console.log('Disconnected from server');
});
