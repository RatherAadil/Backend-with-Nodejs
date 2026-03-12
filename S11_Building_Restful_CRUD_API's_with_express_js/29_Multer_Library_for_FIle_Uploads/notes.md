## Multer

Multer is a Node.js middleware used with Express for handling multipart/form-data, which is primarily used to upload files.

- Basic Setup:

```javascript
const express = require('express');
import multer from 'multer';
const app = express();
```

- Set storage

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name
  },
});

const upload = multer({ storage: storage });
```

#### 🧠 Explanation

1. destination → Folder to store files
2. filename → unique filename generate (avoid overwrite)
3. `const upload = multer({ storage: storage });` → Multer Instance

### Route to handle file upload

```javascript
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send('File uploaded successfully');
});
```

- If you want to uplaod multiple files at a time

```javascript
app.post(
  '/upload',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'bg', maxCount: 5 },
  ]),
  (req, res) => {
    res.json({ message: 'File upload successfull' });
  },
);
```

- Note:
  1. `upload.single('myFile')`: for one file
  2. `upload.fields(array of objects)`: for multiple files
  3. Files are stored in the folder you specify` (./uploads)`

* For more Information visit: https://www.npmjs.com/package/multer
