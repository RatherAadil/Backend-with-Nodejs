### 📌 Understanding Path Traversal Vulnerability

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
