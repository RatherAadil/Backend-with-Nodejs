## Internal Buffer of Readable Stream

- The chunks that we recieve till the stream is ended is called as internal buffer.
- Every time this internal buffer changes with every chunk.
- Internal Buffer size is equivalent to highWaterMark.

```javascript
readStream.on('readable', () => {
  console.log(readStream.readableLength);
  console.log(readStream.read());
  console.log(readStream.readableLength);
});
```

- Here we are listening for readable event, when it fires.

* ` console.log(readStream.readableLength);` It will show how much bytes of data is coming in chunk
* `readStream.read();` will read the data. Also we can pass the number of bytes that we want to read from buffer.
* `console.log(readStream.readableLength);` It will show remaining bytes of data in chunk.
