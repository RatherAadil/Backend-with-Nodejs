## Closing Writable Streams in Node.js

### Readable stream closes automatically

- A Readable stream (like fs.createReadStream) is connected to a finite data source (for example, a file).
- Node.js knows exactly when the source ends
- When all data is read:
- the end event is emitted
- the stream automatically releases the file descriptor
- the close event is emitted
- 👉 You do NOT need to manually close a readable stream
  It closes itself because there is no more data to read.

---

### writable stream

Writable streams should always be properly closed to prevent unnecessary memory usage. When a stream stays open, it continues to consume RAM even if you're done writing.

### How to Close a Writable Stream?

Use:

```javascript
writeStream.end();
```

- This signals that you’re done writing.
- After calling `.end()`, no more `.write() `calls are allowed.

### Optional: Pass Data in .end()

- You can also write small final data while closing the stream:

```javascript
writeStream.end('Final data here');
```

### Important Events After .end()

1. `finish `
   - Emitted when all data has been flushed to the underlying system.
   - This event is triggered before the stream is fully closed.
     ```javascript
     writeStream.on('finish', () => {
       console.log('Finished writing');
     });
     ```

2. `close `
   - Emitted when the stream and its underlying resources (like file descriptors) are completely closed.
   - Always comes after the finish event.
   ```javascript
   writeStream.on('close', () => {
     console.log('Stream closed');
   });
   ```
