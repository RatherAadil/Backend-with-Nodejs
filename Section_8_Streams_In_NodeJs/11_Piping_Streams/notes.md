### Piping Streams in Node.js

- Piping is a mechanism to connect a readable stream to a writable stream directly.
- It makes data flow from one stream to another — automatically managing backpressure 😌.

### Basic Usage

```javascript
readStream.pipe(writeStream);
```

- This automatically starts reading from readStream and writing to writeStream.

* It automatically handles the `backpressure`

### Unpiping

```javascript
readStream.unpipe(writeStream);
```

Stops piping from readStream to writeStream.

## Events Triggered

- Both pipe and unpipe events are fired on the writable stream (writeStream).

```javascript
writeStream.on('pipe', () => {
  console.log('✅ Piping started!');
});
writeStream.on('unpipe', () => {
  console.log('🚫 Piping stopped.');
});
```

### Why Use Piping?

- Simplifies stream operations
- Great for file copying, logging, compressing, etc.
- Automatically respects backpressure
