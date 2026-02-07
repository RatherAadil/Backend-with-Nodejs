## Middlewares in Express.js

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
