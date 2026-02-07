# 🧾 Intro to ExpressJS

### 🌐 Overview

ExpressJS is a **lightweight and flexible** web framework that makes building REST APIs, web apps, and servers on Node.js incredibly easy. It is widely recognized for its simple routing, middleware integration, request/response handling, and support for rapid development.

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

### 💬 Key Notes

- **HTML Serving**: Express’s `res.send()` is designed to serve HTML content with the content-type automatically handled.
- **Security/Privacy**: You can use `app.disable(headerName)` to turn off certain default headers, such as `"x-powered-by"`, to hide that your server is running on Express.
- **Ecosystem**: ExpressJS is the most popular framework in the Node.js ecosystem, boasting excellent documentation, a massive community, and a huge library of plugins.

---

# Express is built on **Node.js `http` module**

- At its core, Express does **not replace Node’s HTTP server**.
- Under the hood, when you call:

```jsx
const app = express();
app.listen(3000);
```

It actually creates a **Node.js `http.createServer`** internally and starts listening.

So → Express is really just an **abstraction layer** over Node’s `http` module that makes things simpler.

---

# Middlewares in Express.js

A middleware is a handler function that can process incoming requests and outgoing responses in an Express app.

```javascript
(req, res, next) => { ... }
```

- You can have multiple middlewares chained together.
- Each middleware must call next() to pass control to the next one.

- Example with Multiple Middlewares

```javascript
app.get(
  '/',
  (req, res, next) => {
    console.log('M1');
    next(); // moves to next middleware
  },
  (req, res) => {
    console.log('M2');
    res.send('Done');
  },
);
```

- If `next()` is not called, the next middleware is never executed.

### Behind the Scenes

        Express stores all middlewares for a route in an array.
        When a request comes in, it executes them in order.
        If the last middleware calls next(), nothing happens (no more middleware left).

### Types of Middleware

1. **Request Handler Middleware**

```javascript
   (req, res, next) => { ... }
```

- Runs on every request.
- Used for logging, parsing, authentication, etc.

2. **Error Handling Middleware**

```javascript
(err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
};
```

- Must have 4 parameters.
- **Triggers when:**

      1. A previous middleware calls next(err)
      2. An error is thrown in a previous middleware

3.  **Built-in Error Handling**

- Express includes default error handling.
- But you can override it with a custom error handler like this:

```javascript
app.use((err, req, res, next) => {
  res.status(500).send(`Custom error: ${err.message}`);
});
```

---

# Handling Different HTTP Methods in Express

In Express, each HTTP method has a corresponding function:

    app.get(path, handler);     // Read data
    app.post(path, handler);    // Create data
    app.put(path, handler);     // Replace data
    app.patch(path, handler);   // Update partial data
    app.delete(path, handler);  // Delete data
    app.all(path, handler);     // Handle all methods

---

## Difference between Route and Request URL

- `req.url` -> vo path hai , jo client bhejtha hai hume as request
- `route `-> route vo path , jo hum define karthe hai , uss request ko handle karne ke liye

---

# Global Middleware

A global middleware is a function that runs for every request coming into your Express app — regardless of the route or HTTP method.

**Syntax:**

```javascript
app.use(middlewareFunction);
```

- `app.use()` is used to register middleware globally.
- It should be placed before all route handlers, so it runs before any route is matched.

**Important Notes**

    Global middleware must be above all route definitions.
    If next() is not called, the request will hang and never reach the route.
    You can chain multiple app.use() for different purposes.

## 🛠️ Handling Request Bodies in Express

### Manual Parsing

If you manually use `req.on("data")` to parse every chunk, you are responsible for collecting, merging, and JSON-parsing the data yourself. This approach is **error-prone, inefficient, and complex**, especially when dealing with large requests.

**Manual Example (Not Recommended):**

```javascript
app.use((req, res, next) => {
  req.on('data', (chunk) => {
    // This is risky! What if the JSON is incomplete or malformed?
    const reqBody = JSON.parse(chunk.toString());
    req.body = reqBody;
    next();
  });
});
```

### Built-in `express.json()`

Express provides `app.use(express.json())`.

- **Automatic Parsing:** It automatically parses every incoming JSON request (provided it is valid).
- **Ready-to-use Data:** The parsed data is immediately available in `req.body` inside your route handlers.
- **Safety First:** It automatically sends a **400 Bad Request** error if the client sends malformed JSON.
- **Production Ready:** Optimized for high performance and minimal memory issues.

### 🔸 Benefits of `express.json()`

- **Simple Setup:** A one-line solution for all your POST and PUT JSON parsing needs.
- **Cleaner Code:** No more manual chunk handling or boilerplate code; data is easily accessed via `req.body`.
- **Fewer Bugs:** Built-in error handling ensures your server doesn't crash on invalid input.
- **Global Middleware:** When placed at the top of your script, it runs automatically for every incoming request.

**The Professional Implementation:**

```javascript
import express from 'express';
const app = express();

// Global middleware to parse JSON
app.use(express.json());

app.post('/data', (req, res) => {
  // req.body is already parsed and ready!
  console.log(req.body);
  res.send('Data received successfully');
});

app.listen(4000);
```

---

# Adding Route-Specific Middleware in Express

By using `app.use(path, middleware)`, you can define **route-specific middleware** that runs for every request on a particular path (and its sub-paths). Unlike global middleware, this is triggered in a **targeted** way.

### 🔹 How It Works

`app.use('/path', middlewareFn)`:

- This middleware will execute for every request where the URL **starts with** `/path`, whether the route is exactly `/path` or a sub-path like `/path/subpage`.
- It will **never** run for unrelated routes (e.g., a `/user` middleware will not trigger for an `/admin` route).

#### **Example:**

```javascript
app.use('/user', (req, res, next) => {
  console.log('User route middleware');
  next();
});
```

- **Runs for:** `/user`, `/user/123`
- **Doesn't run for:** `/admin`, `/anythingelse`

### 🔹 Comparison: `app.use` vs. `app.get/app.post`

| Feature            | `app.use(path, middlewareFn)`                    | `app.get(path, handler)`                       |
| ------------------ | ------------------------------------------------ | ---------------------------------------------- |
| **Matching Logic** | Checks if `req.url` **starts with** the path.    | Strictly matches the **full route** pattern.   |
| **Method**         | Runs for **all** HTTP methods (GET, POST, etc.). | Runs only for the **specific** method defined. |

### 🔹 Practical Example

```javascript
app.use(express.json());

// Targeted Middleware for Admin routes
app.use('/admin', (req, res, next) => {
  if (req.body.password === 'secret') {
    next();
  } else {
    res.status(401).end('Invalid Credentials');
  }
});

// Route Handler
app.post('/admin', (req, res) => {
  res.end('Hello Admin');
});
```

- Whenever a `POST` or `GET` request hits `/admin` or `/admin/*`, the credential middleware executes first.
- If the correct password isn't provided, the request is terminated early and doesn't reach the route handler.

### 💡 Notes & Best Practices

- **Placement:** Always place route-specific middleware **before** your route handlers.
- **Chaining:** You can chain multiple middlewares (e.g., authentication → logging → role-check).
- **Modularity:** For complex apps, use `express.Router()` to keep these route-specific logics organized.
- **Order Matters:** Execution follows the order of definition: Middleware runs first, Route Handler runs last.

> **In short:** > `app.use('/path', middlewareFn)` ensures your logic (like auth or logging) only runs for relevant routes, keeping your global middleware stack clean.

---

# Serving Static Files in Express

### 🌐 How `express.static()` Middleware Works

Express.js provides a built-in middleware called `express.static()` to serve static assets (images, CSS, JavaScript, etc.) from a server-side directory (e.g., a folder named "public") directly to the client. This happens automatically without the need for manual file reading, streaming logic, or MIME-type handling.

### Usage and Advantages

**Simple Implementation:**

```javascript
app.use(express.static('public'));
```

- **Automatic Routing:** Now, if a browser requests `/num.txt`, Express will automatically look for and serve `public/num.txt`.
- **Abstraction:** There is **no need** to manually use `fs.readFile`, `createReadStream`, or set manual headers—Express handles all the heavy lifting internally.

### 🔸 Sending Files Dynamically with `res.sendFile()`

If a file is not inside your designated static folder, or if you want to serve a file through a custom route with specific logic, use `res.sendFile(absPath)`:

```javascript
app.get('/download', (req, res) => {
  // Note: Sends a specific file using absolute path.
  res.sendFile(`${import.meta.dirname}/reactjs.mp4`);
});
```

- **Absolute Path:** This method sends the file at the specified absolute path with the proper headers and optimized streaming.
- **Important**: For video's it automatically handles forward and backward play without loading entire data from starting.

---

# Sending JSON and status codes using express

- If we want to sent the json, normally we would send it like this:

```javascript
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Hello world' }));
});
```

- But in express js we have a method on `res` to send the json:
- Method : `res.json()`

```javascript
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});
```

- Behind the scenes the `json()` method automatically sets the `Content-Type` response header and automatically `stringify` the data.

### send status codes

- To send the status codes we chain the `.status()` method with `res`

```javascript
app.get('/', (req, res) => {
  res.status(201).json({ message: 'Hello world' });
});
```

- This `res.status()` returns the `res` and then it sends the json

---

# 🧾 Dynamic Routing + File Storage in Express

### 🌐 High-level Idea

This code creates a small **file storage CRUD API** where every filename is taken from the dynamic route parameter `:filename` in the URL. The request path and method determine whether a file will be created, read, renamed, or deleted.

### 🔹 Routing Overview (Dynamic `:filename`)

In Express, `/:filename` is a **route parameter**.

- **URL:** `POST /notes.txt` → `req.params.filename === "notes.txt"`
- This pattern is used across all methods: `POST`, `GET`, `PATCH`, and `DELETE`.

## 🧱 API Endpoints (CRUD)

### 1. Create – `POST /:filename`

```javascript
app.post('/:filename', (req, res) => {
  const writeStream = createWriteStream(`./storage/${req.params.filename}`);
  req.pipe(writeStream);
  req.on('end', () => {
    res.json({ message: 'File Uploaded' });
  });
});
```

- Whatever data the client sends in the body (binary or text) will be written directly into `./storage/<filename>`.
- `req.pipe(writeStream)` uses **streaming-based writing**, which is highly efficient for handling large files.
- **Example:** `POST /notes.txt` with the body `"Hello"` results in the creation of the `storage/notes.txt` file.

### 2. Read – List & Single File

#### a) List all files – `GET /`

```javascript
app.get('/', async (req, res) => {
  const filesList = await readdir('./storage');
  res.json(filesList);
});
```

- `readdir()` returns an array of all files and folders inside the `./storage` directory.
- This is perfect for building a frontend file explorer.

#### b) Get/Download single file – `GET /:filename`

```javascript
app.get('/:filename', (req, res) => {
  const { filename } = req.params;
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});
```

- The filename is retrieved from `req.params.filename`.
- If the query includes `?action=download`, the header `Content-Disposition: attachment` is set, which triggers the browser's download dialog.
- `res.sendFile()` streams the file using its absolute path.
- **Example URLs:**
- **View:** `GET /avatar.png`
- **Download:** `GET /avatar.png?action=download`

### 3. Update (Rename) – `PATCH /:filename`

```javascript
app.patch('/:filename', async (req, res) => {
  const { filename } = req.params;
  await rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
  res.json({ message: 'Renamed' });
});
```

- This expects `newFilename` in the request body (JSON, e.g., `{ "newFilename": "new.txt" }`).
- `fs/promises.rename()` renames the existing file to the new name.
- **Example:** `PATCH /notes.txt` with body `{ "newFilename": "todo.txt" }` changes `notes.txt` → `todo.txt`.

### 4. Delete – `DELETE /:filename`

```javascript
app.delete('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename}`;
  try {
    await rm(filePath);
    res.json({ message: 'File Deleted Successfully' });
  } catch (err) {
    res.status(404).json({ message: 'File Not Found!' });
  }
});
```

- `fs.promises.rm()` is used to delete the file.
- If the file does not exist, it returns a `404` JSON error.

## 🌍 CORS + JSON Parsing

```javascript
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  });
  next();
});
```

- `express.json()`: Ensures JSON bodies are automatically parsed (essential for the PATCH rename operation).
- **CORS headers:** These allow API calls to be made from any frontend origin.

## 🧠 What You’ve Built

| Method     | Endpoint     | Action             |
| ---------- | ------------ | ------------------ |
| **POST**   | `/:filename` | Create/Upload file |
| **GET**    | `/`          | List all files     |
| **GET**    | `/:filename` | View/Download file |
| **PATCH**  | `/:filename` | Rename file        |
| **DELETE** | `/:filename` | Delete file        |

---

# What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that allows or restricts web pages from making requests to a different origin (domain, protocol, or port) than the one that served the web page.
Introduced: Around 2006 as a standard by the W3C to overcome the limitations of the Same-Origin Policy.

### Why CORS is Needed?

- By default, the browser’s Same-Origin Policy blocks requests made from one origin to another for security reasons (to prevent Cross-Site Request Forgery - CSRF or Cross-Site Scripting - XSS attacks).
- So, CORS provides a controlled way to relax that policy.

### What is an Origin?

        An origin is defined by three things:
            Protocol (http or https)
            Domain (example.com)
            Port (:3000, :5000, etc.)
            If any of these change, it becomes a different origin.

- Example:

      Frontend: http://localhost:3000
      Backend: http://localhost:5000

  - A fetch request from frontend to backend is a cross-origin request, and the browser will block it unless the backend allows it using CORS headers.

### How to enable CORS (Manuallt):

- For specif origins

```javascript
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.100.10:5500',
  ];
  if (allowedOrigins.includes(req.headers.origin)) {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
  }
  next();
});
```

- For all origins:

```javascript
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
```

### How to Enable CORS (in Express) using cors package

- Install CORS middleware:

```bash
npm install cors
```

- Then in your server code:

```javascript
const cors = require('cors');
app.use(cor());
```

OR

restrict to a specific origin:

```javascript
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
```

### Behind the Scenes: CORS Headers

When the server receives a cross-origin request, it responds with special headers like:

```javascript
  Access-Control-Allow-Origin: http://localhost:3000
  Access-Control-Allow-Methods: GET, POST
  Access-Control-Allow-Headers: Content-Type
```

---

# Understanding preflight request

For non-simple requests (e.g., with custom headers or methods like PUT, DELETE), the browser first sends an OPTIONS request called a preflight to check if the server allows it.

    If the server responds with proper headers, only then the actual request is made.

    Simple Request
    GET, POST (with basic content types)
    No preflight

    Complex Request
    PUT, DELETE, PATCH, or with custom headers
    Preflight (OPTIONS) sent

- For more information study on MDN

---

# summary of the video For Folder no: 15

- Implemented nested directory structure for file storage
- Implemented the functionality for chcek directory or file while reading the storage folder using stat method
- move to the storage directory and create nested directories and files to test the functionality
- important point is create dynamic optional params in express route to handle both root and nested directory reading

* syntex express v4+ : `/directory/:dirname?` -> '?' makes the param optional
* syntex express v5+ : `'/articles{/:year}{/:month}{/:day}'` -> '{}' makes the param optional

---

# Types of ROuting

    Dynamic Routing
        Use : to define route parameters.
        Example: /users/:id → req.params.id

    Optional Routing
        Add {/:} to make params optional.
        Example: /books{/:id} matches /books and /books/123

    Wildcard Routing
        Use `{*any}` to match any trailing path.
        Example: /files{/*any} or /files/path/to/file
        usefull for nested folders/files

    Regex Routing
        Use regex to match routes precisely.
        Example: /^\/user\/(\d+)$/\

    /directory/* wildcard pattern will not work in Express v5.

    The only working wildcard pattern is: /directory{/*any}

    Express v5 uses the new path pattern syntax powered by the path-to-regexp library.
    This syntax is stricter and more explicit.

    -> {*any} is valid (a named wildcard). any is just placeholder

    -> {*any}? makes the wildcard optional.

---

# 📌 Understanding Path Traversal Vulnerability

**🔥 What is Path Traversal?**
A Path Traversal vulnerability occurs when an attacker sends specific file paths through a URL or request that go outside the allowed directory. Examples include:

- `../../etc/passwd`
- `../.../../../secret/config.json`

Because of this, the system or server accesses folders it shouldn't, allowing the attacker to reach locations they normally cannot access. This is a major security risk.

**⚠️ Why is it dangerous?**
If proper validation or checking is missing, an attacker can:

- ✔ Read sensitive configuration files.
- ✔ Extract database passwords.
- ✔ Gain access to the application's source code.
- ✔ Access the server's root folders.

**📍 Risk in our Storage App**
In our code, the current file download logic is:

```javascript
app.get('/files/{*path}', (req, res) => {
  const { path } = req.params;
  const filepath = path.join('/');
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filepath}`);
});
```

`res.sendFile(`{filePath}`);`

This logic directly appends user input to the file path. Therefore, if an attacker inputs a path like `../../`, they can attempt to access files located outside of the designated `storage` folder.

But if we manually create the readStream and then serve the files, it would create the Path Traversal Vulnerability

```javascript
app.get('/files/{*path}', (req, res) => {
  const { path } = req.params;
  const filepath = path.join('/');
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  const readStream = createReadStream(
    `${import.meta.dirname}/storage/${filepath}`,
  );
  readStream.pipe(res);
});
```

- Now if we send a request like this:

        localhost --> your IP

        http://localhost/4000/../../../../anyfile.png

* It would be easily accessible.

---

# path module

```javascript
import path from 'node:path';
```

    path.join()
        Joins multiple path segments into one path and normalizes it (removes .., extra slashes).
        Example: path.join('/foo', 'bar', 'baz') → /foo/bar/baz

    path.normalize()
        Normalizes a path by resolving .., . and redundant slashes without joining.
        Example: path.normalize('/foo/bar//baz/../qux') → /foo/bar/qux

    path.resolve()
        Resolves a sequence of paths into an absolute path. Starts from rightmost path, prepends current dir if needed.
        Example: path.resolve('foo', '/bar', 'baz') → /bar/baz

    path.basename()
        Returns the last part (filename) of a path.
        Example: path.basename('/foo/bar/baz.txt') → baz.txt

    path.dirname()
        Returns the directory part of a path (everything except the last segment).
        Example: path.dirname('/foo/bar/baz.txt') → /foo/bar

## Fixing The vulnerability in our code

- Approach:

1. As we are recieving the url in the form of an array.

```javascript
const dirname = req.params.dirname;
```

2. We passed this array to a function where we used `path.join()` to make the path safe.

```javascript
function pathResolver(segments) {
  const dirPath = segments?.join('/') || '';
  const resolvedPath = path.join('/', dirPath);
  return resolvedPath;
}
```

- Any request on url's like `http://10.50.206.27:5173/../../../` we are making it safe and restricting it to remain inside the `storage` folder.

---

# Express Router

### (Making `app.js` cleaner & modular)

### 🔥 Why Use Express Router?

As a project grows, keeping all routes in `app.js` makes the file bulky, confusing, and unreadable.
To solve this, we:

- ✔ Split routes into different files.
- ✔ Use `express.Router()`.
- ✔ Define only specific categories of routes in each file.
- ✔ Keep `app.js` clean and readable.

### 🧱 Steps Followed

#### ✅ 1. Created Route Files

- `fileRoutes.js`
- `directoryRoutes.js`
  Each file handles its own specific functionality.

#### ✅ 2. Used `express.Router()`

Inside each route file:

```javascript
const router = express.Router();
```

#### ✅ 3. Replaced `app.get()` → `router.get()`

Previously, we used `app.get()` or `app.post()` directly. Now, inside each route file, we use:
`router.get("/*", ...)`
`router.post("/*", ...)`
`router.patch("/*", ...)`
`router.delete("/*", ...)`
This approach makes the code modular.

#### ✅ 4. Exported the Router

At the end of every route file:

```javascript
export default router;
```

This allows us to import the router into `app.js`.

#### ✅ 5. Imported and Used Routes in `app.js`

`app.js` is now much cleaner 👍:

```javascript
import directoryRoutes from './routes/directoryRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

app.use('/directory', directoryRoutes);
app.use('/files', fileRoutes);
```

**How it works:**

- Requests starting with `/directory/...` → routed to `directoryRoutes`
- Requests starting with `/files/...` → routed to `fileRoutes`

---

# Virtual File System

- Currently we are storing all the file, folders inside the storage directory.
- And we are serving all the folders, files, directly to the user. This is not a good approach. we just need to share the information with the user not the entire files.

* This approach is time consuming when we have large sized directories with nested directories.

- For that we can create a json file to store the information about the files and folder seperatly.

- For files its structure would be like:

```json
[
  {
    "id": 10,
    "name": "test.png",
    "parentDir": 321,
    "size": 4353
  },
  {
    "id": 11,
    "name": "test.png",
    "parentDir": 321,
    "size": 4353
  }
]
```

- For Folders :

```json
[
  {
    "id": 1,
    "name": "test",
    "parentDir": null,
    "content": {
      "files": [10],
      "directories": [2, 3]
    }
  },
  {
    "id": 2,
    "name": "images",
    "parentDir": 1,
    "content": {
      "files": [11],
      "directories": []
    }
  }
]
```

---

# REST API Basics

## What is an API?

An **API (Application Programming Interface)** is a set of rules and protocols that allows one software application to interact with another. It defines the methods and data formats that applications can use to communicate, enabling developers to integrate functionalities between different systems.

### Key Features of APIs

1. **Abstraction:**
   - APIs abstract the complexity of underlying implementations and expose only the necessary functionalities.

2. **Interoperability:**
   - APIs enable communication between different software systems, regardless of the platform or technology.

3. **Automation:**
   - APIs allow applications to interact without user intervention, enabling automation of tasks.

4. **Scalability:**
   - APIs support scalability by enabling developers to extend functionalities or integrate with external systems easily.

---

# What is a REST API?

A **REST API** (Representational State Transfer Application Programming Interface) is a web service architecture that allows clients (e.g., browsers, mobile apps) to interact with servers using standard HTTP methods. REST APIs enable data exchange between applications in a stateless, resource-focused manner.

### Key Principles of REST APIs

1. **Resource-Based:**
   - Resources (e.g., `users`, `orders`) are identified using unique URIs (Uniform Resource Identifiers).

2. **Stateless:**
   - Each request from a client to the server must contain all the information needed to process the request.

3. **HTTP Methods:**
   - `GET`: Retrieve data
   - `POST`: Create new resources
   - `PUT`: Update existing resources
   - `PATCH`: Partially update resources
   - `DELETE`: Remove resources

4. **Representation of Resources:**
   - Resources are typically represented in formats like JSON or XML.

5. **Client-Server Architecture:**
   - Separation of concerns between the client (frontend) and the server (backend).

## Best Practices for REST APIs

### 1. **Use Descriptive URIs**

- **Good:** `/users/1/orders`
- **Bad:** `/getUserOrders`

### 2. **Follow HTTP Standards**

- Use HTTP methods correctly for the desired operation (e.g., `GET` for retrieval, `POST` for creation).

### 3. **Version Your API**

- Include versioning in your URI to handle updates gracefully:
  ```
  /v1/users
  /v2/users
  ```

### 4. **Provide Clear Error Messages and Status Codes**

- Use meaningful HTTP status codes and error messages to aid debugging.
  - `200 OK`
  - `201 Created`
  - `400 Bad Request`
  - `401 Unauthorized`
  - `404 Not Found`
  - `500 Internal Server Error`

### 5. **Use Secure Authentication and Authorization**

- Implement secure methods such as **OAuth2** or **JWT (JSON Web Tokens)** to protect sensitive operations.

### 6. **Paginate Large Data Sets**

- When returning a large number of records, paginate the results to improve performance:
  ```
  GET /users?page=2&limit=50
  ```

### 7. **Rate Limiting**

- Protect your API from abuse by limiting the number of requests a client can make:
  ```
  429 Too Many Requests
  ```

### 8. **Cache Responses**

- Implement caching for frequently requested data to improve performance and reduce server load:
  - Use HTTP caching headers like `Cache-Control` and `ETag`.

Adhering to these best practices ensures that your REST API is robust, secure, and user-friendly.

The API which follow REST principles is called a RESTful API.

---

# Error Handling in Express

- In Express, a global error handler is a special middleware that catches all errors in the app. It has four parameters: (err, req, res, next)

- You define it at the end of all routes:

```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
  });
});
```

- You trigger it by throwing an error or calling next(err) in any route.

* Useful for showing proper error messages and avoiding server crashes.

---

# Multer

Multer is a Node.js middleware used with Express for handling multipart/form-data, which is primarily used to upload files.

- Basic Setup:

```javascript
const express = require('express');
import multer from 'multer';
const app = express();
```

- Set storage

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name
  },
});

const upload = multer({ storage: storage });
```

#### 🧠 Explanation

1. destination → Folder to store files
2. filename → unique filename generate (avoid overwrite)
3. `const upload = multer({ storage: storage });` → Multer Instance

### Route to handle file upload

```javascript
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send('File uploaded successfully');
});
```

- If you want to uplaod multiple files at a time

```javascript
app.post(
  '/upload',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'bg', maxCount: 5 },
  ]),
  (req, res) => {
    res.json({ message: 'File upload successfull' });
  },
);
```

- Note:
  1. `upload.single('myFile')`: for one file
  2. `upload.fields(array of objects)`: for multiple files
  3. Files are stored in the folder you specify` (./uploads)`

* For more Information visit: https://www.npmjs.com/package/multer

---

# Cookies

Cookies are small pieces of data (up to 4KB) stored by the browser as key-value pairs.
Accessed in JS using document.cookie

Use case of cookies:

    The web, at its core (HTTP), is stateless. This means every time you click a link or load
    a new page, the server treats it as a brand new, independent request. It has no memory of
    who you are or what you did on the previous page.

    Imagine if every time you clicked "next" in an online store, the website forgot what was
    in your cart. That would be terrible!

    Cookies solve this problem. They are a way to create state—a memory—across multiple
    page requests. The server can say, "Ah, this request has a cookie with the ID user_12345.
    I remember user_12345 had a cart with a laptop and a mouse."

What Do Cookies Store?

    Key, value
    Domain
    Path
    Expiry date
    Size
    Flags like Secure, HttpOnly

Expiry

    By default, cookies are session-based (deleted when the browser closes).
    You can set custom expiry using:
        max-age (in seconds, preferred)
        expires (specific date)

Flags

    Secure: Cookie only works on HTTPS
    HttpOnly: Can’t be accessed via JS (adds security)
    SameSite: Controls cross-site requests (protects against CSRF)

Other Notes

    You can set multiple cookies.
    Special characters must be URL-encoded.
    Third-party cookies are cookies from domains other than the one in the browser’s address bar

Example:

```javascript
document.cookie;
```

---

# Set cookies from server

1.  How Cookies Are Set from Server

        A cookie is sent from the server using the Set-Cookie header:

```javascript
  Set-Cookie: name=aadil
```

        When the browser receives this header in a response, it stores the cookie
        automatically (if rules match). And when the next request is sent to the
        server these cookies are sent via request headers to the server.

2.  HttpOnly Cookies

        Cookies with HttpOnly flag cannot be accessed via JavaScript (document.cookie).
        Only the server can set and read them — great for storing sensitive info (e.g., tokens).

3.  Accessing Cookies in Server

```javascript
const cookies = req.headers.cookie;
```

However, this gives a raw string. Use cookie-parser to parse:

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log(req.cookies); // parsed object
```

4.  Setting Cookies Using Express

```javascript
        res.cookie("name", "aadil", {
        maxAge: 1000 _ 60 _ 60, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: "strict"
        });
```

5.  Cross-Origin Cookie Sharing

        When making fetch or XHR calls to another domain:

        Fetch defaults to:
        credentials: "same-origin"

        Values can be:
        "omit" – never send cookies
        "same-origin" – send only if same origin
        "include" – always send (even cross-origin)

        Note: If credentials: "include" is used, the server must respond with:
        Access-Control-Allow-Credentials: true
        Otherwise, the browser will ignore the cookie.

6.  XHR vs Fetch: credentials: true

        In XHR, credentials are set via xhr.withCredentials = true;
        In Fetch, use credentials: "include"

---

# res.download() Method

`res.download() `in Express sends a file as a download to the client.

Syntax:

```javascript
res.download(path, filename);
```

### What is does behind:

    Sets Content-Disposition: attachment header.
    Internally uses res.sendFile() to stream the file.
    Triggers a download in the browser.

### Example:

```javascript
res.download('path/to/file.pdf', 'report.pdf');
```

- Browser will download the file as report.pdf

---

# app.route() Method

- Used to chain multiple HTTP methods (like GET, POST, etc.) for the same route in a cleaner way.

Example:

```javascript
app.route('/user').get(getUser).post(createUser).put(updateUser);
```

- Keeps your code organized and readable.
- Functionally same as using app.get(), app.post() separately.
- Use it when methods share the same path.

---

# router.param() method

`router.param()` is Express middleware that runs whenever a specific `dynamic route `parameter `(:param)` is present.

- Triggered only for dynamic routes

- Runs before the route handler

- Receives (req, res, next, value)

- Used for validation, preloading data, or normalizing params

- Executes once per request per param

Example:

```javascript
router.param('id', (req, res, next, id) => {
  // validate or load data
  next();
});
```

- It can be used with `app` as well, like:

```javascript
app.param();
```

---

# HTTP Redirection

- HTTP Redirection works by sending a response with a `status code` in the 3xx range,
  along with a `Location header `that specifies the URL to which the client should
  be redirected.

### The most common status codes used for redirection are:

- 301 (Moved Permanently)
- 302 (Found)
- 303 (See Other)
- 307 (Temporary Redirect)
- 308 (Permanent Redirect)

- When a client (like a web browser) receives a redirection response, it will
  automatically make a new request to the URL specified in the `"Location" header`.
- This process is transparent to the user, who will see the new URL in their
  browser's address bar.

## How redirection is done:

1.` First way:`

```javascript
app.get('/directory', (req, res) => {
  res.set({
    location: '/folder',
  });
  res.status(301).end();
});

app.get('/folder', (req, res) => {
  res.json({
    name: 'images',
    files: ['Node.png', 'js.webp'],
  });
});
```

2.` Second way:`

```javascript
app.get('/directory', (req, res) => {
  res
    .writeHead(301, {
      location: '/folder',
    })
    .end();
});

app.get('/folder', (req, res) => {
  res.json({
    name: 'images',
    files: ['Node.png', 'js.webp'],
  });
});
```

3. `Third way (Express):`

```javascript
app.get('/directory', (req, res) => {
  res.redirect(301, 'http://procodrr.com');
});
```

#### For Multiple choice status code `300` we can send json or html to allow user to select a redirection as per choice.

```javascript
app.get('/directory', (req, res) => {
  res.status(300).end(`<!DOCTYPE html>
  <html>
    <head>
      <title>300 Multiple Choices</title>
    </head>
    <body>
      <h1>Multiple Choices</h1>
      <ul>
        <li><a href="/resource.json">JSON Format</a></li>
        <li><a href="/resource.xml">XML Format</a></li>
        <li><a href="/resource.html">HTML Format</a></li>
      </ul>
    </body>
  </html>
  `);
});
```

---

# Understanding Different Types of Form Data

When the browser sends the data to server, it tells the server about the format of data through the `Content-Type`.

1.  application/x-www-form-urlencoded (default)

        Fields separated by & (e.g., name=John&age=30)
        File data not sent, only filenames
        Use in Express: express.urlencoded({ extended: false })

2.  multipart/form-data

        Fields separated by boundaries like --WebKitFormBoundary
        File data is sent as binary along with fields
        Used for file uploads
        Handled in Express by Multer middleware

3.  text/plain

        Fields separated by new lines (\n)
        File data not sent, only filenames
        Use in Express: express.text()

4.  application/json

        Data sent as JSON string
        Use in Express: express.json()

#### Difference between `express.urlencoded({ extended: true })` and `express.urlencoded({ extended: false })`:

extended: false

    Uses querystring library
    Does not support nested objects
    Parses data into a flat object with string values
    Example:
    { 'user[firstname]': 'John', 'user[lastname]': 'Doe' }

extended: true

    Uses qs library
    Supports nested objects and arrays
    Parses data into nested objects
    Example:
    { user: { firstname: 'John', lastname: 'Doe' } }

---

# Regex in Routes

Express lets you use regular expressions to match route paths more flexibly.
Instead of a fixed path string, you use a RegEx pattern to define routes.

Benefits

    Flexible matching: Match complex or variable patterns that can’t be expressed easily with normalparams.
    Fine control: You can restrict allowed values (e.g., digits only).
    Useful for legacy URLs or when paths don’t follow simple patterns.

Drawbacks

    Harder to read and maintain: RegEx can be complex and confusing for others reading your code.
    No named params: Captured groups are accessed by index (req.params[0]), not by names.
    Can be error-prone if regex is not carefully written.

---

# Array of multiple routes

You can handle several routes with the same middleware or handler by passing an array of paths.

Example:

```javascript
app.get(['/dir', '/folder', '/text'], (req, res) => {
  res.send('This works for /dir, /folder, and /text');
});
```

A request to any of /dir, /folder, or /text will trigger this handler.
