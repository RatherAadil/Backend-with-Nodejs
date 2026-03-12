## Global Middleware

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

---

### Built-in `express.json()`

Express provides `app.use(express.json())`.

- **Automatic Parsing:** It automatically parses every incoming JSON request (provided it is valid).
- **Ready-to-use Data:** The parsed data is immediately available in `req.body` inside your route handlers.
- **Safety First:** It automatically sends a **400 Bad Request** error if the client sends malformed JSON.
- **Production Ready:** Optimized for high performance and minimal memory issues.

---

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
