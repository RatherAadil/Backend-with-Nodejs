## TCP Client

    A TCP client connects to a server using the net module. It's responsible for initiating the connection and handling any errors.

### Client Code:

**Create a TCP client**

```javascript
import net from 'node:net';
const client = net.createConnection({ port: 3000, host: '10.148.173.27' });
```

- **Explanation:**

         Port -> port on which the server is listening, and
         host-> IP of server

**Receiving data from server**

```javascript
client.on('data', (chunk) => {
  console.log('Server says:', chunk.toString());
});
```

**Handling server disconnection**

```javascript
client.on('end', () => {
  console.log('Disconnected from server');
});
```

**Error handling**

```javascript
client.on('error', (err) => {
  console.error('Error:', err.message);
  console.log('Server Lost');
});
```

## Key Concepts :

        net.createConnection()	Initiates TCP connection to server
        client.write()	        Sends data to server
        client.on('data')	    Handles incoming server messages
        client.on('error')	    Handles connection errors (important!)
        client.on('end')	    Triggered when server disconnects

- `Tip `-> Always add error handling in both client and server to avoid crashes when connections fail or close unexpectedly.
