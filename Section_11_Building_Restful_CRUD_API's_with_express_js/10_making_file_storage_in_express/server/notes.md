## Sending JSON and status codes using express

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
