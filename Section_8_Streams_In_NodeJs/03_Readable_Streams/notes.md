## Readable Streams in Node.js

Readable Stream is a type of stream where we read the data from the source chunk by chunk

Example :

1. Reading Data from the Network request
2. Reading Data from the file

Streams solve one of the biggest limitations of working with large files using Buffers.

### Why Not Just Use Buffers?

- Cannot load files larger than 2 GiB using Buffer.
- Large file reading/writing puts pressure on RAM and increases CPU usage.

#### Streams to the Rescue:

- Streams process data in chunks instead of loading the entire file.
- Great for performance and memory efficiency.

### Creating a Readable Stream

To create a read stream in Node.js, we use the fs module (non-promises) because it directly supports streaming methods.

```javascript
import fs from 'fs';
// Creating a readable stream with 20KB chunk size
const readStream = fs.createReadStream('./chars.txt', {
  highWaterMark: 20 * 1024, // 20KB per chunk
});
```

### Options in createReadStream()

- `path:` Path of the file to read.
- `highWaterMark:` Size (in bytes) of each data chunk.
  `(Default: 64 KB for files)`

### Listening to Stream Events

A stream emits events that let us react as data comes in:

```javascript
readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk);
});

readStream.on("end", () => {
  console.log("Finished reading the file.");
}
```

Note :

1. `readStream.on("data", (chunk)` here in this line of code , chunk is a buffer
2. In the above code , we are using two events `data` and `end`
3. `data` event will help us read the data in chunks
4. `end` event will run after the entire data has been read

#### ✅ Use Case

**_Perfect when:_**

- Reading large media files
- Streaming logs
- Streaming data from APIs or file-based databases

### Task: Show the progress while reading the chunks

```javascript
import fs from 'fs';
let stats = fs.statSync('contentBuff.mp4');
const fileSize = stats.size;
const readStream = fs.createReadStream('contentBuff.mp4', {
  highWaterMark: 1 * 1024 * 1024, //1MB
});
let bytesRead = 0;
readStream.on('data', (chunk) => {
  bytesRead += chunk.length;
  let progress = percentage(fileSize, bytesRead);
  console.log(`Progress: ${progress}%`);
});

const percentage = (fileSize, bytesRead) =>
  Math.floor((bytesRead * 100) / fileSize);

readStream.on('end', () => {
  console.log(`Total Chunks ${count}`);
});
```

### Comparison between buffers and Streams

#### Buffers

- Time: 193.703ms
- CPU: 2%
- Memory: `1226 MB's`

```javascript
import fs from 'node:fs/promises';
const content = await fs.readFile('chars.txt', 'utf-8');
console.time();
const contentBuffer = await fs.readFile(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
);

await fs.writeFile('contentBuff.mp4', contentBuffer);
console.timeEnd();
```

#### Streams

- Time: 237.022ms
- CPU: 6%
- Memory: `12 MB's `--- Clear Difference

```javascript
import fs from 'fs';
console.time();
const readStream = fs.createReadStream(
  'D:\\Front End Development Course\\Tailwind CSS\\01.Getting Started with Tailwind CSS  Tailwind CSS Complete Course in Hindi.mp4',
  { highWaterMark: 1 * 1024 * 1024 },
);
let readCount = 0;
readStream.on('data', (chunkBuffer) => {
  fs.appendFileSync('contentBuff.txt', chunkBuffer);
  readCount++;
});

readStream.on('end', () => {
  console.timeEnd();
});
```
