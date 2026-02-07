## 🧾 Understanding HTTP Headers

### 🌐 What are HTTP Headers?

HTTP headers are snippets of **extra information** exchanged between a client (browser) and a server. They act as the "metadata" of the request or response, telling the browser:

- What **format** the data is in (e.g., HTML, JSON, WebP).
- The **origin** of the server.

### 🧩 Example of Manual Header Writing

We can set Header in key-value pair, with seperating them by `"\n"`.

#### ❌ The Messy Way

```javascript
socket.write(`HTTP/1.1 200 OKAY
Access-Control-Allow-Origin:*
Access-Control-Expose-Headers:*
hello:world\n\n`);
```

- **Issue:** Sending a multi-line string in one go can be messy, hard to read, and error-prone if the indentation isn't perfect.

      - The content before "\n\n" is called as Response Headers. And the content after it called as Response Data.

#### ✅ The Better Way (Clean & Readable)

```javascript
socket.write('HTTP/1.1 200 OKAY\n');
socket.write('Access-Control-Allow-Origin:*\n');
socket.write('Access-Control-Expose-Headers:*\n');
socket.write('hello:world\n\n');
```

- **Benefit:** This approach is much cleaner. Each line represents a specific HTTP header field clearly.
- **The Crucial Step:** Note the **double newline (`\n\n`)** at the end. This is a mandatory signal in the HTTP protocol that tells the browser: _"The headers are finished; the actual data (the body) starts now."_

---

### 💬 Extra Notes

- **Automation:** Usually, the Node.js `http` module handles these headers for you automatically.
- **Manual Control:** In the `net` module, you are working at the TCP layer, so you must write them yourself.
- **Strictness:** If you don't provide the correct headers (especially the status line and the double newline), the browser might get confused and ignore your response entirely.
