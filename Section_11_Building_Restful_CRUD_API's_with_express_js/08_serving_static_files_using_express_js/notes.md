## Serving Static Files in Express

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
