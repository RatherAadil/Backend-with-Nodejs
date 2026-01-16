## ES6 Modules (ESM)

### 1️⃣ Named Export

In ES6 modules, when we export variables, functions, or constants **with their names**, it is called a **named export**.

```javascript // file: math.js
export const num = 5;
export const sum = (a, b) => a + b;
```

To import a **named export**, we must use **curly braces {}** and the **exact same name**:

```javascript // file: app.js
import { num, sum } from './math.js';
```

👉 **Important rule:**In ES6 modules, you **must write the file extension** (.js, .mjs, .ts, etc.).

```javascript
// ❌ Wrong  import { num } from "./math";
//  // ✅ Correct  import { num } from "./math.js";
```

### 2️⃣ File Extension Rule (ESM vs CommonJS)

#### 🔹 CommonJS

In CommonJS (require), Node.js is very flexible:

```javascript
require('./file');
require('./file.mp4');
require('./file.anything');
```

It works because Node resolves files automatically.

#### 🔹 ES6 Modules

ES6 modules are **strict**.You **must specify the exact extension**:

```javascript
import data from './file.js';
```

No extension = ❌ error.

### 3️⃣ Enabling ES6 Modules in Node.js

By default, Node.js uses **CommonJS**.To use ES6 modules, you must enable them in **one of these two ways**:

#### ✅ Method 1: Use .mjs extension

```javascript
index.mjs;
```

Node will automatically treat it as an ES module.

#### ✅ Method 2: Use package.json

Create or edit package.json:

```javascript
  {    "type": "module"  }
```

Now **all .js files** are treated as ES6 modules.

### 4️⃣ Missing Globals in ES6 Modules

When using ES6 modules, some CommonJS globals are **not available**:

❌ Not available directly:

- \_\_dirname
- \_\_filename
- require

This is because ES6 modules work in **module scope**, not global scope.

### 5️⃣ Scope Difference (Very Important)

#### 🔹 CommonJS

If you write this in CommonJS:

```javascript
b = 8;
```

It goes to the **global scope** (bad practice but allowed).

#### 🔹 ES6 Modules

In ES6 modules:

```javascript
b = 8;
```

❌ Error (or stays module-scoped)

👉 Everything in ES6 modules is **module-scoped by default**👉 **"use strict" is automatically applied**

This makes ES6 modules **safer and cleaner**.

### 6️⃣ Default Export

Another way to export is **default export**.

```javascript
// file: user.js
// const name = "Aman";
//  export default name;
```

To import a default export:

```javascript
import name from './user.js';
```

✔ No curly braces✔ You can rename it to anything

```javascript
import username from './user.js';
```

### 7️⃣ Using Named + Default Export Together

Yes, ES6 allows **both together**:

```javascript
// file: utils.js
//  export const sum = (a, b) => a + b;
//  export default function multiply(a, b)
// {    return a * b;  }
```

Importing:

```javascript
import multiply, { sum } from './utils.js';
```

### 8️⃣ Why This Is NOT Possible in CommonJS

In CommonJS:

```javascript
exports.sum = 7;
module.exports = sum;
```

❌ This is a bad pattern.

Why?

- module.exports is **one single object**
- Assigning it overwrites everything else
- CommonJS returns **only one export object**

ES6 modules are **designed differently**, so they support:

- Multiple named exports
- One default export
- Clear and predictable imports
