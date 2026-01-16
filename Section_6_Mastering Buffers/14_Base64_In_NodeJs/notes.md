## Base64 in NodeJS

🔐 Base64 is used to encode binary data (like images, PDFs, files) into a text-based format, especially useful when the communication medium only supports text.

- 📦 Base64 Characteristics
- ✅ Encodes binary into 64 ASCII characters: A–Z, a–z, 0–9, +, /
- ⚠️ Adds = for padding if data isn't divisible by 3
- 📈 Increases file size by ~1.3x
- 📤 Useful for sending/embedding files in:
  1. HTML, CSS (inline images)
  2. JSON, query strings
  3. Email attachments

## 🖥️ Terminal Commands

- 🔡 Encode image to Base64:
  `base64 image.png`
- 🌐 Generate Data URL for inline use:
  ```javascript
  echo "data:image/png;base64,$(base64 image.png)"
  ```

* You can paste the output directly into HTML:

```javascript
<img src='data:image/png;base64,iVBORw0KGg...' />
```

## Why Base64?

- Many systems (HTTP, SMTP, JSON) only support plain text, not raw binary.
- Base64 ensures safe transmission/storage of binary in those systems.

## Base64url – URL-Safe Variant

- Base64url is a modified version of Base64 that works better in URLs and query parameters.

* Base64url: + / = (removed)

### 📌 Used in:

- JWT tokens
- Query strings
- Web APIs
  **_Example: abc+123/== ➡ becomes ➡ abc-123_**
