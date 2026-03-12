### Writing to a File in Node.js (Using File Descriptor)

For writing data we should make sure the file is open in write mode

### Step-by-Step

1. Open the File in Write Mode

```javascript
import fs from 'fs';
const fd = fs.openSync('file.txt', 'w');
```

- `w` ensures it's writable

* `Mode "w"`: Creates the file if it doesn’t exist, and truncates it (clears content) if it does.

2. Write to the File (Async)

```javascript
fs.write(fd, 'Hello World', (err, bytesWritten, str) => {
  console.log('Error:', err);
  console.log('Bytes Written:', bytesWritten);
  console.log('String Written:', str);
});
```

- `bytesWritten`: How many bytes were actually written.

* `str`: The actual string written.

### Or Use Sync Version

```javascript
const bytesWritten = fs.writeSync(fd, 'Hello Sync World');
console.log('Bytes Written (Sync):', bytesWritten);
```
