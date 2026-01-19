## Working with Streams Using Promises in Node.js

- When using the `fs/promises` module, you don’t directly use `fs.createReadStream() or fs.createWriteStream()` like in the regular fs module.

* Instead, you first open the file using `fs.open()` which returns a `FileHandle` — and then use methods from that object.

### Example Code:

```javascript
import fs from 'fs/promises';
// 1️⃣ Open the file in read+write mode
const fileHandle = await fs.open('text.txt', 'r+');

// 2️⃣ Read Stream from fileHandle
const readStream = fileHandle.createReadStream();
readStream.setEncoding('utf-8');
readStream.on('data', (chunk) => {
  console.log('Chunk from file:', chunk);
});

// 3️⃣ Write Stream from fileHandle
const writeStream = fileHandle.createWriteStream();
writeStream.write('hiiiiiiiiiiiiiiiii');

// Optional: Close manually if needed
await fileHandle.close();
```

### Key Points

- `createReadStream() and createWriteStream()` are methods available on FileHandle, not on the fs/promises module directly.

* `readStream.setEncoding("utf-8") `makes sure you get string data instead of a buffer.
* `writeStream.write()` behaves like a standard stream — supports chunked writing and backpressure handling.
* These are ideal when working with files asynchronously while still leveraging the performance benefits of streams.
