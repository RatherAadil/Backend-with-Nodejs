import net from 'node:net';
process.stdin.on('data', inputHandler);
const clientsList = [];

const server = net.createServer((socket) => {
  const client = {
    id: crypto.randomUUID(),
    username: null,
    socket,
  };

  clientsList.push(client);
  console.log('Client connected:', socket.remoteAddress);

  socket.on('data', (chunk) => {
    const message = chunk.toString().trim();

    if (message.startsWith('-cl')) {
      clientsList.forEach((c) => {
        if (c.socket === socket) {
          const allConnectedClients = clientsList
            .filter((client) => client.username)
            .map((client) => client.username);
          c.socket.write(`Connected clients:  ${allConnectedClients}`);
        }
      });
    }
    if (message.startsWith('-h')) {
      clientsList.forEach((c) => {
        if (c.socket === socket) {
          const commands = getAvailableCommands();
          Object.entries(commands).forEach(([cmd, desc]) => {
            socket.write(`\n${cmd} → ${desc}\n`);
          });
        }
      });
    }

    if (!client.username) {
      client.username = message;
      console.log(`${client.username} joined the chat`);
      return;
    }

    console.log(`${client.username}: ${message}`);

    clientsList.forEach((c) => {
      if (c.socket !== socket) {
        if (message !== '-h' && message !== '-cl')
          c.socket.write(`${client.username}: ${message}\n`);
      }
    });
  });

  socket.on('close', () => {
    const index = clientsList.indexOf(client);
    if (index !== -1) clientsList.splice(index, 1);

    if (client.username) {
      console.log(`${client.username} disconnected`);
    }
  });

  socket.on('error', () => {
    console.log('Client error');
  });
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});

function inputHandler(input) {
  const inputString = input.toString().trim();

  // Private message: -u username message
  if (inputString.startsWith('-u ')) {
    sendPrivateMessage(inputString);
  } else if (inputString.startsWith('-cl')) {
    const allConnectedClients = clientsList
      .filter((client) => client.username)
      .map((client) => client.username);

    console.log(`Connected Clients: ${allConnectedClients}`);
  } else if (inputString.startsWith('-remove')) {
    removeClient(inputString);
  } else if (inputString.startsWith('-h')) {
    const commands = getAvailableCommands();
    Object.entries(commands).forEach(([cmd, desc]) => {
      console.log(`${cmd} → ${desc}\n`);
    });
  } else {
    // Broadcast message
    clientsList.forEach((client) => {
      client.socket.write(`Server: ${inputString}\n`);
    });
  }
}

function sendPrivateMessage(inputString) {
  const parts = inputString.split(' ');
  const targetUsername = parts[1];
  const message = parts.slice(2).join(' ');

  const targetClient = clientsList.find(
    (client) => client.username === targetUsername,
  );

  if (!targetClient) {
    console.log(`User "${targetUsername}" not found`);
    return;
  }

  targetClient.socket.write(`Server (private): ${message}\n`);
  return;
}

const removeClient = (inputString) => {
  const parts = inputString.split(' ');
  const targetUsername = parts[1];

  const index = clientsList.findIndex(
    (client) => client.username === targetUsername,
  );

  if (index === -1) {
    console.log(`User "${targetUsername}" not found`);
    return;
  }

  const client = clientsList[index];

  client.socket.write('You have been removed by the server\n');
  client.socket.destroy();

  clientsList.splice(index, 1);

  console.log(`User "${targetUsername}" removed`);
};

const getAvailableCommands = () => {
  const commands = {
    '-cl': 'To know about connected clients',
    '-remove': 'remove a client (Server only)',
    '-u': 'send private messages (Server only)',
    '-h': 'For help',
  };
  return commands;
};
