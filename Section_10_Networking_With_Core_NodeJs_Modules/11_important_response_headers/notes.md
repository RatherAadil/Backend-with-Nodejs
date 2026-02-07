## Important Response Headers (Node.js Net Module)

- When we create a server using net (raw TCP) instead of the http module,
  we manually send HTTP response headers to the client (browser).

* Example 👇

```javascript
const server = net.createServer(async (socket) => {
  const fileHandle = await open('numbers.txt');
  const readStream = fileHandle.createReadStream();

  const { size } = await fileHandle.stat();
  socket.write('HTTP/1.1 200 OKAY\n');
  socket.write('Content-Type: text/txt; charset=utf-8\n');
  socket.write(`Content-Length: ${size}`);
  socket.write('\n\n');
  readStream.pipe(socket);
});
```

### 1. Content-Length

- Tells the browser how many bytes of data will be sent.
- After receiving this exact number, the browser closes the socket automatically.

* Example:

        Content-Length: 1024

* `🧠 Note:`If not provided, the browser may keep waiting or disconnect early.

### 2. Content-Type

- Informs the browser what kind of data is being sent (text, image, JSON, etc.)
- This helps the browser decide how to display the content.
- Example:

        Content-Type: text/txt; charset=utf-8

#### Common MIME types:

- text/html → for webpages
- text/plain → for plain text
- image/png → for images
- application/pdf → for PDFs

### 3. Content-Disposition

- Tells the browser how to handle the content —
- whether to display inline or download as a file.
- Examples:

**To download:**

        Content-Disposition: attachment; filename=hello.pdf

**To preview in browser:**

        Content-Disposition: inline

### 🧩 You can add extra properties using semicolons ;

`like filename, size, or creation-date.
`
