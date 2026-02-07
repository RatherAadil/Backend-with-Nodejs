## Reading Files Using File Descriptors in Node.js

When you want low-level control over file reading (without using streams or higher-level methods), you can use the fs.read() method with a file descriptor (FD).

### Basic Example

```javascript
import fs from 'fs';
const fd = fs.openSync('text.txt'); // Open file synchronously--- Read using the file descriptor
fs.read(fd, (err, bytesRead, bufferData) => {
  console.log(err); // null if no error console.log(bytesRead); // Number of bytes read
  console.log(bufferData); // Buffer data console.log(bufferData.byteLength);
  // Default buffer size: 16 KB (16384)
});
```

## Limiting the Buffer Size

You can pass a custom buffer using the buffer option to control how much data to read:

```javascript
const readBuffer = Buffer.alloc(10);
fs.read(
  fd,
  { buffer: readBuffer }, // Create a buffer of 10 bytes
  (err, bytesRead, bufferData) => {
    console.log(err);
    console.log(bytesRead); // Might be less than 10 if file is shorter
    console.log(bufferData); // Shows raw binary data
    console.log(bufferData.byteLength); // 10
  },
);
```

### Reading from a Specific Position

You can also pass additional options like position and length:

```javascript
const readBuffer = Buffer.alloc(10);
fs.read(
  fd,
  {
    buffer: readBuffer, // buffer to fill
    offset: 0, // start writing at the beginning of buffer
    length: 20, // read 20 bytes
    position: 5, // start reading from byte 5 in the file
  },
  (err, bytesRead, bufferData) => {
    console.log(err);
    console.log(bytesRead);
    console.log(bufferData.toString());
    // Convert buffer to readable text
  },
);
```

### Summary of Options You Can Pass

Option
Description

- `buffer`: Where to store the read data (Buffer object)
- `offset`: Start writing inside the buffer from this index
- `length`: How many bytes to read
- `position`: File position from where to begin reading
