## HTTP Redirection

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
