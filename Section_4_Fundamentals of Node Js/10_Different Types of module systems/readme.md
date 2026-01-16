## Different Types of Modules in Node.js

In Node.js, modules are mainly divided into **three types**:

### 1) User Modules (Custom Modules)

- **User modules** are the modules that **we create ourselves**.
- When we create a JavaScript file and **export something from it**, that file becomes a user module.
- We can then **import it into another file**.

**Example:**

```javascript
// math.js  export const add = (a, b) => a + b;
```

```javascript
// app.js  import { add } from "./math.js";
```

➡️ Since math.js is created by us, it is a **user module**.

### 2) Core Modules (Native Modules)

- **Core modules** are **built-in modules** provided by Node.js.
- They are available **automatically when Node.js is installed**.
- We **do not need to install** them using npm.

**Example:**

```javascript
import fs from 'fs';
```

- fs (File System) is a **core module**.

✅ **Good Practice:**We can also write:

```javascript
import fs from 'node:fs';
```

- Using node:fs clearly tells that this module comes from **Node.js core**.
- This is **optional**, but recommended for clarity.

### 3) NPM Modules (Third-Party Modules)

- **NPM modules** are modules provided by **external developers**.
- They are installed using **npm (Node Package Manager)**.
- We must install them **before importing**.

**Example:**

```javascript
  npm install axios
```

```javascript
import axios from 'axios';
```

- axios is an **npm (third-party) module**.

### Summary Table

| Type of Module | Source             | Installation Needed |
| -------------- | ------------------ | ------------------- |
| User Module    | Created by us      | ❌ No               |
| Core Module    | Built into Node.js | ❌ No               |
| NPM Module     | External (npm)     | ✅ Yes              |
