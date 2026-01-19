## Backpressure & Internal Buffer in Writable Streams

Writable streams in Node.js use an internal buffer to manage how data is written. But if data is written faster than it can be flushed, we face Backpressure — a signal to slow down writing.

### Internal Buffer

- Every writable stream maintains a buffer.

* `writeStream.writableLength ` → shows how much data (in bytes) is currently queued in the internal buffer.
  - It can exceed highWaterMark if writes are very frequent.

### How .write() Works

```javascript
const ok = writeStream.write('some data');
```

- `.write()` returns:
  - `true ` → if writableLength <= highWaterMark
  - `false ` → if internal buffer is full
    When it returns false, you must pause writing until the buffer drains.

### drain Event

```javascript
writeStream.on('drain', handler);
```

- Fires when the buffer is cleared, and the stream is ready for more data.
- Used to resume writing after `.write()` returned false.

## Why Does Backpressure Happen?

Backpressure occurs when a Writable stream cannot process incoming data as fast as it’s being written to it.

Writable streams have an internal buffer. If you write too much data too quickly.

- The buffer fills up.
- The stream pauses or slows down incoming writes.
- You must wait before writing more.

### Real Example: Writing 100,000 Lines

```javascript
function writeMany(writer, data, count) {
  let i = 0;
  function write() {
    while (i < count) {
      const ok = writer.write(data);
      i++;
      if (!ok) {
        writer.once('drain', write); // Wait for buffer to drain
        return;
      }
    }
    writer.end();
  }
  write();
}
writeMany(fs.createWriteStream('file.txt'), 'Hello\n', 100000);
```

- ✅ Efficient writing
- ✅ No memory overload
- ✅ Handles backpressure with .once("drain")
