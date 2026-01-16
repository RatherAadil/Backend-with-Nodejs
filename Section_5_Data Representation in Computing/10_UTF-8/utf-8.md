## 🧬 UTF-8 Encoding in Depth

#### 🧪 Tools to Explore UTF-8 Internals:

To understand how data is converted and stored in UTF-8, we can use these terminal commands:

- **`xxd <filename>`**
  → Displays the hexadecimal (Unicode-like) content of a file in groups of two bytes.
- **`xxd -g 1 <filename>`**
  → Displays the hex content grouped per byte (very useful for byte-level analysis).
- **`xxd -b <filename>`**
  → Displays the binary representation of each byte in the file.

🔧 **Bonus:** Install a **Hex Editor** extension in your code editor (e.g., VSCode) to visually inspect the bytes of a file.

#### 🔁 When Does Encoding Happen?

Encoding is applied in two phases:

1. **Saving the file:** Your text editor encodes characters into bytes based on the specified encoding (e.g., UTF-8).
2. **Opening the file:** The reader (another program or system) decodes the bytes back to characters using the same encoding.

#### 🧬 UTF-8 Encoding Characteristics

- **UTF-8 is a variable-length encoding.**
  It uses to bytes depending on the character.
- **It’s backward compatible with ASCII.**
  Characters up to **U+007F** () are stored using a single byte (`0xxxxxxx`), just like ASCII.

#### 🔡 UTF-8 Byte Format Rules:

| Character Range        | Bytes Used | Binary Format                         | Description               |
| ---------------------- | ---------- | ------------------------------------- | ------------------------- |
| **U+0000 – U+007F**    | $1$ byte   | `0xxxxxxx`                            | ASCII compatible          |
| **U+0080 – U+07FF**    | $2$ byte   | `110xxxxx 10xxxxxx`                   | For Latin, Greek, etc.    |
| **U+0800 – U+FFFF**    | $3$ byte   | `1110xxxx 10xxxxxx 10xxxxxx`          | For most common languages |
| **U+10000 – U+10FFFF** | $4$ byte   | `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` | For emojis, rare symbols  |

> ✅ **Note:** The **1s** in prefixes (like `110`, `1110`, etc.) are used to identify the byte count and are not part of the character value.

---

#### 📁 Real-World Use Case

If you read a file using `fs.readFile()` in Node.js, it gives you a **buffer**. That buffer contains these raw UTF-8 encoded byte values. If you print that buffer in hexadecimal or binary, you’ll see exactly how each character was stored.

```javascript
import fs from 'fs';

// Node.js example showing raw buffer
fs.readFile('example.txt', (err, buffer) => {
  console.log(buffer);
  // Output: <Buffer 48 65 6c 6c 6f>
});
```
