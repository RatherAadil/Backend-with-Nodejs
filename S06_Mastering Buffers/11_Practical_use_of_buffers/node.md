## 📦 Practical Use Case of Buffers in Node.js 💻

## 📁 1. Reading Files

- When you read a file using fs.readFile() or fs.readFileSync(), the data is returned in the form of a Buffer.

```javascript
import fs from 'node:fs/promises';
const a = await fs.readFile('file.txt');
console.log(a);

// <Buffer ...>
console.log(data.toString());
```

- ✅ This helps in efficiently handling binary data like images, audio, or large text files.

---

## 🌐 2. Receiving Data from Client (Frontend to Backend)

### Sending data from FrontEnd/ Client

```javascript
fetch('http://localhost:3000/', {
  method: 'POST',
  body: 'Rather Aadil',
})
  .then((res) => res.text())
  .then((data) => console.log(data));
```

## Recieving Data from Client

- Whenever data is sent from a browser (frontend) to a Node.js server (backend), it is transmitted in binary format — i.e., as buffers.

```javascript
import http from 'http';
import fs from 'node:fs/promises';
const server = http.createServer((req, res) => {
  req.on('data', (reqBody) => {
    console.log(reqBody.toString());
    fs.writeFile('data.txt', reqBody);
  });

  res.setHeader('Content-Type', 'text/txt; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end('Hello from server');
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
```

- Here we recieved the data from the client and stored that into a file named data.txt

* ✅ This is how form submissions, JSON payloads, or file uploads work.
