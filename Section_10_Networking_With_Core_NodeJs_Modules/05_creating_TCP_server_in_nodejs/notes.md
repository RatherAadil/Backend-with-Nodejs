## TCP Server

#### Note: As we used our mobile phone as a client in UDP server using UDP app, we did the same in this case practically.

```javascript
import net from 'node:net';
net.createServer(); // creates a server
net.createConnection(); // creates a client
// nothing like createSocket, which was in UDP
```

```javascript
const server = net.createServer();

// server.listen(4000);
// server.on("listening", () => {
//   console.log("Server started on port 4000");
// });

//The above commented code is equivalent to

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
```

- To check if any client is connected or not.

* In my mobile I basically wrote the ip of my lappy where this server is started, and the port number which is 4000
* As I did Connect from Server from my phone in my log I was able to saw Client Connected

* But how can we see what data is being send from our client to server Or form our server to client
* We know, we need a socket for communication, client already has a socket, because its a full fledged app in my phone
* To use a socket with our server we should know, the connection method, already provide us a socket by a callback as you can see below
* UDP's socket was not much powerful, but `TCP socket is a duplex stream`

```javascript
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    //Now basically here I can see the message in log, which I have sent from the phone
    console.log(chunk.toString());

    //This message will be sent to our client from server
    socket.write('HTTP\n\nGot your message');
  });
  console.log(socket.address()); //Address of our lappy where server has been started
  //The below three logs give the info of the client, and its just a string, not an object
  console.log(socket.remoteAddress);
  console.log(socket.remotePort);
  console.log(socket.remoteFamily);

  console.log('Client Connected');

  //When the client gets disconnected
  socket.on('close', () => {
    console.log('Client Disconnected');
  });
});
```

### Detailed version (same)

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  // Server Info
  console.log(socket.address());

  // Client Info
  console.log(socket.remoteAddress);
  console.log(socket.remotePort);
  console.log(socket.remoteFamily);

  // Receiving data from client
  socket.on('data', (data) => {
    console.log('Client says:', data.toString());

    // Sending response back
    socket.write('Hello from server');
  });

  // Detect client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

TCP 3-Way Handshake (Before Data Transfer)

1.  **Client → Server: SYN**
2.  **Server → Client: SYN + ACK**
3.  **Client → Server: ACK**

#### Connection established. Ready to exchange data.

          socket.address()	    Shows server IP and port
          socket.remoteAddress	Shows client IP
          socket.remotePort	    Shows client port
          socket.remoteFamily	    Shows IP type (e.g., IPv4/IPv6)

#### Duplex Stream (Bi-directional)

        -> socket is a duplex stream: you can both read from and write to it.
        -> Use socket.write() to send data back to client.
