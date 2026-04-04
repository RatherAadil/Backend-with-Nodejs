# Using inline scripts with hash

### 1. Write the Inline Script

```js
<script>console.log("Hello CSP!");</script>
```

### 2. Generate SHA-256 Hash

In Node.js:

```ts
crypto
  .createHash('sha256')
  .update('console.log("Hello CSP!");')
  .digest('base64');
```

### 3. Add Hash to CSP Header

```ts
Content-Security-Policy: script-src 'self' 'sha256-<your-hash>';
```

### 4. Keep Script Exactly the Same

Even a small change breaks the hash match.
