# Reporting CSP

### 1. Add Reporting in CSP Header

```ts
- Use report-uri or report-to:
- Content-Security-Policy: default-src 'self'; report-uri /csp-report
```

### 2. Browser Sends Violation Reports

```
Sends JSON to your endpoint when a CSP rule is violated.
```

### 3. Create Server Endpoint to Receive Reports

```ts
   Example (Express.js):

   app.post('/csp-report', express.json({ type: "application/csp-report"}), (req, res) => {
   console.log(req.body);
   res.sendStatus(204);
   });
```
