## 🌐 Creating an HTTP Server Using the `net` Module

### 🧠 Concept Overview

Normally, we build web servers using the `http` module. However, by using the `net` module, we can create a **raw TCP-based** HTTP-like server. This means we are manually handling the data transmission to the client (like a browser) without the high-level abstractions of the `http` module.

### ⚙️ Code Explanation

#### 1. Server Creation

```javascript
import net from "node:net";
import { createReadStream } from "node:fs";

const server = net.createServer((socket) => { ... });

```

- `net.createServer()` initializes a TCP server.
- For every connected client, a **socket** is provided, which acts as the bidirectional communication channel.

#### 2. Sending an HTTP-like Response

```javascript
socket.write('HTTP/1.1\n\n');
```

- This sends a minimal HTTP header.
- Standard HTTP headers usually include `Content-Type`, `Content-Length`, etc. Here, we send a bare-bones "HTTP/1.1" so the browser recognizes the incoming data as a web response.

#### 3. Sending File Data via Streams

```javascript
const readStream = createReadStream('river.webp');
readStream.pipe(socket);
```

- **`pipe()`** is the key here. It means: _"Take the output of this file stream and send it directly into the socket's input."_
- This allows file data packets to reach the client efficiently without manually managing data chunks.

#### 4. Handling Events

- **`data`**: Triggered when the client sends data to the server.
- **`end`**: Triggered when the file stream has finished reading.
- **`close`**: Triggered when the client disconnects.
- **`error`**: Triggered if the connection is lost or an error occurs.

#### 5. Listening on a Port

```javascript
server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
```

- This starts the server on **Port 4000**. Using `"0.0.0.0"` makes it accessible from all network interfaces on your machine.

---

### 💡 Real-World Analogy

Think of it like a **water pipeline**:

- The **File Stream** is the water source (the data).
- The **Socket** is the tank at the other end (the client).
- **`pipe()`** is the physical pipe connecting the two, allowing the water to flow automatically. 💧

---

### ⚠️ Note

Browsers communicate via **TCP** (which HTTP is built upon). Because this code uses the `net` module to speak over TCP and provides a basic HTTP header, a browser can actually render the image. While this isn't a "production-ready" HTTP server, it is an excellent low-level demonstration of how the web works under the hood.

