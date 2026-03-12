## Express is built on **Node.js `http` module**

- At its core, Express does **not replace Node’s HTTP server**.
- Under the hood, when you call:

```jsx
const app = express();
app.listen(3000);
```

It actually creates a **Node.js `http.createServer`** internally and starts listening.

So → Express is really just an **abstraction layer** over Node’s `http` module that makes things simpler.
