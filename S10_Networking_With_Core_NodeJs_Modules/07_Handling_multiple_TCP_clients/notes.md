## 🖥 Handling Multiple TCP Clients in Node.js

### 🔹 Server (`app.js`)

The `clientsList` is an array where the socket of every newly connected client is stored.

- **When a client sends a message:** It is received via the `data` event, and the server broadcasts it to all connected clients.
- **Server Input:** If you type into the server terminal, that input is also broadcasted to all clients via the `clientsList`.

**Handled Events:**

- `data`: Receives and broadcasts messages.
- `close`: Triggered when a client disconnects.
- `error`: Triggered when a client connection is lost.

> 👉 **Result:** This essentially creates the foundation for a **chatroom server**.

**Example Flow:**

1. **Client A** and **Client B** connect.
2. **Client A** types "Hello" → Server sends it to **Client B**.
3. **Client B** types "Hi" → Server sends it to **Client A**.
4. The server console displays the total count of connected clients.

---

### 🔹 Client (`client.js`)

- Every client creates a socket using `net.createConnection`.
- **Sending:** Data typed into the client terminal is sent directly to the server.
- **Receiving:** When data arrives from the server, it is printed to the console.
- **Error Handling:** If the server goes down, "Server Lost" is printed.

---

### 📝 Notes / Use Case

- This setup serves as the basic foundation for a **TCP chat application**.
- **Customization:** You can assign usernames to make messages more readable.
- **Logging:** Adding the client’s address (`socket.remoteAddress`) to the message logs will clarify exactly who sent which message.
