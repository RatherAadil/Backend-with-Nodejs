### 🔤 Encoding

- Unless specified otherwise, the **default encoding** used is **UTF-8**.
- If **different encodings** are used during **encoding and decoding**, data mismatches may occur.
- Encoding note:

  - `"binary"` is an alias for `"latin1"`, which is similar to `"ascii"`.

---

## 📘 Common Buffer Methods

---

### 1. `toString()`

Converts the buffer content to a string (default encoding: UTF-8).

```js
const { Buffer } = require('node:buffer');
const fs = require('node:fs');

const nodeBuffer = Buffer.alloc(5);
nodeBuffer[0] = 97;
nodeBuffer[4] = 98;

console.log(nodeBuffer);
console.log(nodeBuffer.buffer);

console.log(nodeBuffer.toString());
console.log(nodeBuffer.toString('hex'));

fs.writeFileSync('output.txt', nodeBuffer);
```

**Output:**

```
<Buffer 61 00 00 00 62>
ArrayBuffer { [Uint8Contents]: <61 00 00 00 62>, byteLength: 5 }
ab
6100000062
```

**Notes:**

- `Buffer.alloc()` fills the buffer with **zeros** (`0x00`), which represent **NULL in UTF-8**.
- NULL bytes are not displayed in the console output but **exist in the file** (`output.txt`).

---

### 2. `write()`

Writes data into the buffer from the start (index `0` by default).

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.alloc(8);

console.log(nodeBuffer);

nodeBuffer.write('abc');
console.log(nodeBuffer);
console.log(nodeBuffer.toString());

nodeBuffer.write('xy');
console.log(nodeBuffer);
console.log(nodeBuffer.toString());
```

**Output:**

```
<Buffer 00 00 00 00 00 00 00 00>
<Buffer 61 62 63 00 00 00 00 00>
abc
<Buffer 78 79 63 00 00 00 00 00>
xyc
```

---

### 3. `toJSON()`

Converts a buffer into a JSON object (data values in decimal).

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.from('Hello world');

console.log(nodeBuffer);
console.log(nodeBuffer.toJSON());
console.log(nodeBuffer.toString());
```

---

### 4. `subarray()`

Creates a **sub-buffer** from an existing buffer (no copy, shared memory).

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.from('Hello world');
const subBuffer = nodeBuffer.subarray(2, 8);

console.log(nodeBuffer.toString());
console.log(subBuffer.toString());
```

**Output:**

```
Hello world
llo wo
```

---

### 5. `copy()`

Copies content from one buffer to another. You can control the **destination start index** and the **source range**.

```js
const { Buffer } = require('node:buffer');

const nodeBuffer1 = Buffer.from('abcdef');
const nodeBuffer2 = Buffer.from('pqrstu');

console.log(nodeBuffer1.toString());
console.log(nodeBuffer2.toString());

nodeBuffer1.copy(nodeBuffer2, 1, 3, 5);

console.log(nodeBuffer2.toString());
```

**Output:**

```
abcdef
pqrstu
pdeftu
```

---

### 6. `includes()`

Checks whether a string or byte sequence exists within a buffer.

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.from('hello world');
const result = nodeBuffer.includes('hel');

console.log(nodeBuffer.toString());
console.log(result);
```

**Output:**

```
hello world
true
```

---

### 7. `fill()`

Fills the entire buffer (or part of it) with the given value.

```js
const { Buffer } = require('node:buffer');

const nodeBuffer1 = Buffer.from('hello world');
const nodeBuffer2 = Buffer.alloc(10);

console.log(nodeBuffer1.toString());
console.log(nodeBuffer2.toString());

nodeBuffer1.fill('a');
nodeBuffer2.fill('a');

console.log(nodeBuffer1.toString());
console.log(nodeBuffer2.toString());
```

**Output:**

```
hello world

aaaaaaaaaaa
aaaaaaaaaa
```

---

### 8. `at()`

Returns the byte value at a specific index.

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.from('hello world');

console.log(nodeBuffer.toString());
console.log(nodeBuffer.at(2));
```

**Output:**

```
hello world
108
```

---

## ⚙️ Reading and Writing with Specific Byte Encodings

Use methods like:

- `writeInt8()`, `writeInt16BE()`, `writeInt16LE()`
- `readInt8()`, `readInt16BE()`, `readInt16LE()`

### Example

```js
const { Buffer } = require('node:buffer');
const nodeBuffer = Buffer.alloc(8);

nodeBuffer.writeInt8(97);
console.log(nodeBuffer);

nodeBuffer.fill(0);
nodeBuffer.writeInt16LE(98, 1);
console.log(nodeBuffer);

nodeBuffer.fill(0);
nodeBuffer.writeInt16BE(99, 1);
console.log(nodeBuffer);

console.log(nodeBuffer.readInt8(2));
console.log(nodeBuffer.readInt16LE(2));
console.log(nodeBuffer.readInt16BE(2));
```

**Output:**

```
<Buffer 61 00 00 00 00 00 00 00>
<Buffer 00 62 00 00 00 00 00 00>
<Buffer 00 00 63 00 00 00 00 00>
99
99
25344
```

---

### 🔍 Explanation

| Operation             | Offset | Endianness | Effect                            |
| --------------------- | ------ | ---------- | --------------------------------- |
| `writeInt8(97)`       | 0      | n/a        | Writes 0x61 (‘a’)                 |
| `writeInt16LE(98, 1)` | 1      | Little     | Bytes: 62 00                      |
| `writeInt16BE(99, 1)` | 1      | Big        | Bytes: 00 63                      |
| `readInt8(2)`         | 2      | n/a        | Reads 99                          |
| `readInt16LE(2)`      | 2      | Little     | Interprets 63 00 as 00 63 → 99    |
| `readInt16BE(2)`      | 2      | Big        | Interprets 63 00 as 63 00 → 25344 |

---

## 📦 Buffer Properties

```js
const { Buffer } = require('node:buffer');

const nodeBuffer = Buffer.alloc(11);
nodeBuffer.write('hello world');

console.log(nodeBuffer.buffer);
console.log(nodeBuffer.byteLength);
console.log(nodeBuffer.byteOffset);
console.log(nodeBuffer.length);
```

**Output:**

```
ArrayBuffer {
  [Uint8Contents]: <68 65 6c 6c 6f 20 77 6f 72 6c 64>,
  byteLength: 11
}
11
0
11
```
