## 📁 Node.js File System (`fs`) Guide

#### Main har fs method ka:

- 1️⃣ **Why use** (kyu use karte hain)
- 2️⃣ **Definition** (simple language)
- 3️⃣ **Practical example** (real-life backend use)

sab clearly + short code examples ke saath bata raha hoon.

##### 💡 Examples Node.js (fs module) ke hain.

`fs/promises` async-await ke liye use hota hai, `fs` callback-based hota hai.

---

### 📁 FILE OPERATIONS – Node.js fs

#### 1. 1️⃣ fs.rename(oldPath, newPath)

- ✅ **Why use**
- File ya folder ka naam change karne ke liye
- File ko ek folder se dusre folder me move karne ke liye

#### 📘 Definition

- Existing file/folder ka path change karta hai (rename ya move).

###### 🧪 Practical Example

```javascript
import { rename } from 'node:fs/promises';

// rename file
rename('data.txt', 'info.txt');

// move file

rename(
  'node.png',
  'C:\\Users\\ADIL\\Desktop\\Backend with Node Js\\Fundamentals of Node Js\\21_fs_module_file_operation\\src\\node.png'
);
```

---

#### 2. 2️⃣ fs.copyFile(src, dest)

- ✅ **Why use**: Single file copy karne ke liye
- 📘 **Definition**: Source file ko destination me copy karta hai.

###### 🧪 Practical Example

```javascript
import { copyFile } from 'node:fs/promises';
copyFile('node.png', 'useImg.png');
```

##### 🧠 Use case:

- ➡️ Backup file banana

---

#### 3. 3️⃣ fs.cp(src, dest, { recursive: true })

- ✅ **Why use**: Complete folder + subfolders + files copy karne ke liye

#### 📘 Definition

- Ek directory ko recursively copy karta hai.

###### 🧪 Practical Example

```javascript
import fs from 'fs';

fs.cp('project', 'project-backup', { recursive: true }, () => {
  console.log('Folder copied');
});
```

##### 🧠 Use case:

- ➡️ Project backup / deployment

---

#### 4. 4️⃣ fs.unlink(path)

- ✅ **Why use**: Single file delete karne ke liye
- 📘 **Definition**: File ko permanently delete karta hai.

###### 🧪 Practical Example

```javascript
import { unlink } from 'node:fs/promises';
unlink('temp.txt');
```

---

#### 5. 5️⃣ fs.rmdir(path)

- ✅ **Why use**: Empty directory delete karne ke liye
- 📘 **Definition**: Sirf empty folder ko remove karta hai.

###### 🧪 Practical Example

```javascript
import fs from 'fs';

fs.rmdir('empty-folder', () => {
  console.log('Directory removed');
});
```

⚠️ **Folder empty hona chahiye**

---

#### 6. 6️⃣ fs.rm(path, { recursive: true })

- ✅ **Why use**: Folder + andar ka sab kuch delete karne ke liye
- 📘 **Definition**: Directory ko recursively delete karta hai (files + subfolders).

###### 🧪 Practical Example

```javascript
import fs from 'fs';

fs.rm('old-project', { recursive: true, force: true }, () => {
  console.log('Directory deleted completely');
});
```

🔥 **Very powerful → carefully use karo**

---

#### 7. 7️⃣ fs.mkdir(path)

- ✅ **Why use**: New directory create karne ke liye
- 📘 **Definition**: New folder create karta hai.

###### 🧪 Practical Example

```javascript
import fs from 'fs';

fs.mkdir('uploads', () => {
  console.log('Folder created');
});
```

📌 **Nested folder:**

```javascript
fs.mkdir('public/images', { recursive: true }, () => {});
```

---

#### 8. 8️⃣ fs.stat(path)

- ✅ **Why use**: File/folder ka size, type, created time check karne ke liye
- 📘 **Definition**: File ya directory ka metadata deta hai.

###### 🧪 Practical Example

```javascript
import { stat } from 'node:fs/promises';

const stats = await stat('app.js');
console.log(stats);
```

##### 🧠 Use case:

- ➡️ Upload validation (file size check)

---

#### 9. 9️⃣ fs.watch(path)

- ✅ **Why use**: File/folder me changes detect karne ke liye
- 📘 **Definition**: File system ke changes ko real-time me watch karta hai.

###### 🧪 Practical Example

```javascript
import fs from 'fs';

fs.watch('file-1.txt', (eventType, filename) => {
  console.log('Event:', eventType);
  console.log('File:', filename);
});
```

📌 **Events**

- `change` → content changed
- `rename` → file rename / delete

##### 🧠 Use case:

- Auto reload
- Log monitoring
- Live build tools (nodemon)

---

### 🧠 Summary Table

| Method       | Use                       |
| ------------ | ------------------------- |
| **rename**   | Rename / move file        |
| **copyFile** | Copy single file          |
| **cp**       | Copy whole folder         |
| **unlink**   | Delete file               |
| **rmdir**    | Delete empty folder       |
| **rm**       | Delete folder recursively |
| **mkdir**    | Create folder             |
| **stat**     | File info                 |
| **watch**    | Monitor changes           |

---

### 🎯 Interview Tip

- **fs/promises** → modern async/await ke liye.
- **fs (callback)** → `fs.watch`, streams, aur legacy code ke liye.
