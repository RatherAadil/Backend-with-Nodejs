## Writable Streams in Node.js

Writable streams allow you to write data in chunks to a destination — such as a file, HTTP response, or socket.

### Creating a Writable Stream

```javascript
import fs from 'fs';
const writeStream = fs.createWriteStream('output.txt', {
  highWaterMark: 16 * 1024,
});
```

- `fs.createWriteStream(path, options)`
  - Creates a new file if it doesn't exist
  - Similar to fs.writeFile() but works in a streaming manner
  - Faster than repeatedly using appendFile()

### Buffer Size (highWaterMark)

By default, Node.js uses a highWaterMark of 16 KB (16384 bytes) for writable streams.

You can access it using:

```javascript
writeStream.writableHighWaterMark;
```

### Writing Data

```javascript
writeStream.write('Hello World!');
```

- The first .write() call overwrites any existing file content.
- All subsequent .write() calls append the data.

### RAM Usage & Backpressure

- Writing large or continuous data can consume a lot of RAM.
- Though it's fast, this can lead to memory overflow if the system can’t keep up.
- This is where Backpressure comes into play (to be covered next).

`🧠 Summary:` Use writable streams for large or continuous data writes, but be aware of memory usage and control it using backpressure.
