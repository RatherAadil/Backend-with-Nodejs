## 📦 What is the Module Wrapper Function in Node.js?

In **Node.js**, **every JavaScript file is treated as a module**.Before executing your code, **Node.js automatically wraps it inside a function** called the **module wrapper function**.

### 🔹 The Wrapper Function Looks Like This:

```javascript
   (function (exports, require, module, __filename, __dirname) {      // Your module code goes here  });
```

You **never write this function yourself** — **Node.js does it internally**.

## 🔄 What Happens When You Run node app.js?

When you run:

```javascript
   node app.js
```

Node.js does the following:

1.  Reads all the code inside app.js
2.  Wraps that code inside the module wrapper function
3.  Executes the wrapped function

So internally, your file becomes something like this:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // code written in app.js
})();
```

## 📌 Why Does Node.js Create a Wrapper Function?

### 1️⃣ To Avoid Global Scope Pollution

Because your code runs **inside a function**, all variables you create are **local to that module**.

```javascript
let x = 10;
```

➡️ x is **NOT global**➡️ It belongs only to that file (module)

This prevents **name collisions** between different files.

### 2️⃣ To Provide Module-Specific Variables

The wrapper function automatically provides these **5 important variables**:

| Variable     | Purpose                             |
| ------------ | ----------------------------------- |
| `exports`    | Used to export values from a module |
| `require`    | Used to import other modules        |
| `module`     | Represents the current module       |
| `__filename` | Full path of the current file       |
| `__dirname`  | Directory path of the current file  |

These variables look global, but they are actually **function parameters**.

### 3️⃣ To Enable the require() System

When you use:

```javascript
const data = require('./test');
```

Node.js does this:

1.  Finds test.js
2.  Wraps test.js in **its own module wrapper function**
3.  Creates a **new module object**
4.  Executes the wrapped function
5.  Returns module.exports

👉 Each file gets:

- Its **own wrapper function**
- Its **own local scope**
- Its **own module object**

## 🔁 Nested (Deep) Execution Explained

If app.js requires a.js, and a.js requires b.js:

```javascript
   app.js
     └── a.js
           └── b.js
```

Each file is:

- Wrapped in its **own wrapper function**
- Executed independently
- Scoped locally

This may feel like “deepening”, but it’s actually **module isolation**, not recursion.

## 🧠 Simple One-Line Explanation

> **Node.js wraps every file inside a function so that variables stay local, modules stay isolated, and the global scope remains clean.**
