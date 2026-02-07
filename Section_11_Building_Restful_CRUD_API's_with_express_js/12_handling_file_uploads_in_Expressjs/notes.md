## 🧾 Dynamic Routing + File Storage in Express

### 🌐 High-level Idea

This code creates a small **file storage CRUD API** where every filename is taken from the dynamic route parameter `:filename` in the URL. The request path and method determine whether a file will be created, read, renamed, or deleted.

### 🔹 Routing Overview (Dynamic `:filename`)

In Express, `/:filename` is a **route parameter**.

- **URL:** `POST /notes.txt` → `req.params.filename === "notes.txt"`
- This pattern is used across all methods: `POST`, `GET`, `PATCH`, and `DELETE`.

---

## 🧱 API Endpoints (CRUD)

### 1. Create – `POST /:filename`

```javascript
app.post('/:filename', (req, res) => {
  const writeStream = createWriteStream(`./storage/${req.params.filename}`);
  req.pipe(writeStream);
  req.on('end', () => {
    res.json({ message: 'File Uploaded' });
  });
});
```

- Whatever data the client sends in the body (binary or text) will be written directly into `./storage/<filename>`.
- `req.pipe(writeStream)` uses **streaming-based writing**, which is highly efficient for handling large files.
- **Example:** `POST /notes.txt` with the body `"Hello"` results in the creation of the `storage/notes.txt` file.

### 2. Read – List & Single File

#### a) List all files – `GET /`

```javascript
app.get('/', async (req, res) => {
  const filesList = await readdir('./storage');
  res.json(filesList);
});
```

- `readdir()` returns an array of all files and folders inside the `./storage` directory.
- This is perfect for building a frontend file explorer.

#### b) Get/Download single file – `GET /:filename`

```javascript
app.get('/:filename', (req, res) => {
  const { filename } = req.params;
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});
```

- The filename is retrieved from `req.params.filename`.
- If the query includes `?action=download`, the header `Content-Disposition: attachment` is set, which triggers the browser's download dialog.
- `res.sendFile()` streams the file using its absolute path.
- **Example URLs:**
- **View:** `GET /avatar.png`
- **Download:** `GET /avatar.png?action=download`

### 3. Update (Rename) – `PATCH /:filename`

```javascript
app.patch('/:filename', async (req, res) => {
  const { filename } = req.params;
  await rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
  res.json({ message: 'Renamed' });
});
```

- This expects `newFilename` in the request body (JSON, e.g., `{ "newFilename": "new.txt" }`).
- `fs/promises.rename()` renames the existing file to the new name.
- **Example:** `PATCH /notes.txt` with body `{ "newFilename": "todo.txt" }` changes `notes.txt` → `todo.txt`.

### 4. Delete – `DELETE /:filename`

```javascript
app.delete('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename}`;
  try {
    await rm(filePath);
    res.json({ message: 'File Deleted Successfully' });
  } catch (err) {
    res.status(404).json({ message: 'File Not Found!' });
  }
});
```

- `fs.promises.rm()` is used to delete the file.
- If the file does not exist, it returns a `404` JSON error.

---

## 🌍 CORS + JSON Parsing

```javascript
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  });
  next();
});
```

- `express.json()`: Ensures JSON bodies are automatically parsed (essential for the PATCH rename operation).
- **CORS headers:** These allow API calls to be made from any frontend origin.

---

## 🧠 What You’ve Built

| Method     | Endpoint     | Action             |
| ---------- | ------------ | ------------------ |
| **POST**   | `/:filename` | Create/Upload file |
| **GET**    | `/`          | List all files     |
| **GET**    | `/:filename` | View/Download file |
| **PATCH**  | `/:filename` | Rename file        |
| **DELETE** | `/:filename` | Delete file        |
