## What is CORS?

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
