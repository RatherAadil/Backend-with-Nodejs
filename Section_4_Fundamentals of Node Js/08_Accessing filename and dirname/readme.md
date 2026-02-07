# Accessing \_\_filename and \_\_dirname in ES6 Modules

In **ES6 modules (ESM)**, \_\_filename and \_\_dirname are **not available by default** like in CommonJS.Instead, Node.js provides a **modern replacement using import.meta**.

To understand this properly, we must first understand **what import.meta actually is**.

## 1️⃣ What is import.meta?

Many people assume:

> import is an object and meta is a property ❌

That is **wrong**.

### ✅ Correct Understanding

- import.meta is a **special language-level meta-property**
- It is **not split** into import and meta
- It exists **only in ES modules**
- It is **not available in CommonJS**

```javascript
console.log(import.meta);
```

import.meta is provided by the JavaScript runtime to expose **metadata about the current module**.

## 2️⃣ Availability of import.meta

### 🔹 CommonJS

```javascript
// ❌ Not available  import.meta
```

### 🔹 ES6 Modules

```javascript
// ✅ Available  import.meta
```

To use it in Node.js, your file must be:

- .mjs**OR**
- "type": "module" in package.json

## 3️⃣ What import.meta Provides

### 🌐 In Browsers

```javascript
import.meta.url;
```

Only one thing:

- url → URL of the current module

### 🟢 In Modern Node.js (IMPORTANT)

Node.js **extends** import.meta.

It provides:

```javascript
import.meta.url;
import.meta.filename;
import.meta.dirname;
import.meta.resolve();
```

⚠️ **Notice**These are provided **WITHOUT underscores**(filename, dirname — not \_\_filename, \_\_dirname)

## 4️⃣ Modern Replacement for \_\_filename and \_\_dirname

### ✅ Correct & Updated Way

```javascript
const { filename, dirname } = import.meta;
console.log(filename); // full path of current file  console.log(dirname);
// directory of current module
```

These behave exactly like:

- \_\_filename
- \_\_dirname

but in **ESM style**.

## 5️⃣ Why Node Did NOT Reuse \_\_filename and \_\_dirname

- ES modules are **spec-compliant**
- CommonJS globals (\_\_dirname, require) break module isolation
- Node moved to **explicit metadata via import.meta**

This ensures:

- No accidental globals
- Strict module boundaries
- Better compatibility with browsers

## 6️⃣ Is import.meta an Object?

✅ Yes.

```javascript
typeof import.meta; // "object"
```

Because it’s an object, you **can technically add properties**:

```javascript
import.meta.author = 'Aman';
console.log(import.meta.author);
```

⚠️ **Note**

- This is allowed
- But **not recommended**
- import.meta should be treated as **read-only metadata**

## 7️⃣ Why NOT Use process.cwd()?

This is a **very common confusion**, so let’s clear it clearly.

### 🔹 process.cwd()

```javascript
process.cwd();
```

- Returns **where Node.js was executed**
- Depends on terminal location
- Can change every time you run the command

### 🔹 import.meta.dirname

```javascript
import.meta.dirname;
```

- Returns **where the module file exists**
- Independent of execution location
- Safe for resolving file paths

### 🧠 Core Difference

| Feature                     | process.cwd()  | import.meta.dirname |
| --------------------------- | -------------- | ------------------- |
| Based on                    | Execution path | File location       |
| Changes with command        | ✅ Yes         | ❌ No               |
| Safe for module paths       | ❌ No          | ✅ Yes              |
| Replacement for \_\_dirname | ❌ No          | ✅ Yes              |

👉 **Never use process.cwd() to replace \_\_dirname**

## 8️⃣ Final Summary (One Look)

- ES6 modules **do not expose** \_\_filename & \_\_dirname
- Node provides **modern replacements** via import.meta
- import.meta is **special syntax**, not import.meta = {}
- Modern Node supports:

  - import.meta.filename
  - import.meta.dirname

- process.cwd() is **not module-safe**

## ✅ Final Recommended Template (Modern Node.js)

```javascript
const { filename, dirname } = import.meta;
console.log(filename);
console.log(dirname);
```
