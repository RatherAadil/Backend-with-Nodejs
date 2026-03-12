## 🧾 Intro to ExpressJS

### 🌐 Overview

ExpressJS is a **lightweight and flexible** web framework that makes building REST APIs, web apps, and servers on Node.js incredibly easy. It is widely recognized for its simple routing, middleware integration, request/response handling, and support for rapid development.

---

### 🔹 ExpressJS Quick Start

**Installation Command:**

```bash
npm i express

```

This command downloads Express and all its required dependencies into your project's `node_modules` folder.

**Sample Server Code:**

```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000);
```

**Key Logic:**

- **`express();`**: Returns an handler

* **`app.get()`**: Creates a specific route to handle GET requests.
* **`res.send()`**: Returns an HTML response and automatically sets the header `Content-Type: text/html`.
* **`res.end()`**: If you use this instead, it sends plain text only—it does **not** automatically set the content-type header.

> **Comparison:** Writing Express code is straightforward because you maintain full control over the project structure. In contrast, **NestJS** enforces a stricter structure but provides more out-of-the-box features for large-scale applications.

---

### 💬 Key Notes

- **HTML Serving**: Express’s `res.send()` is designed to serve HTML content with the content-type automatically handled.
- **Security/Privacy**: You can use `app.disable(headerName)` to turn off certain default headers, such as `"x-powered-by"`, to hide that your server is running on Express.
- **Ecosystem**: ExpressJS is the most popular framework in the Node.js ecosystem, boasting excellent documentation, a massive community, and a huge library of plugins.
