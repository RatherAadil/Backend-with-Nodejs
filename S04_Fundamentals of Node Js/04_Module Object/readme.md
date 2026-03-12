## Node.js Variables, Scope & Module Object

### Local scope in Node.js

If we create a variable in Node.js, it is stored in the **local scope of that file**.Each file in Node.js is treated as a **separate module**, so variables are **not global** by default.

### Variables automatically available in every file

Node.js provides these variables to every file:

```javascript
   __dirname  __filename  exports  module  require
```

These variables are **not created by us**.They are **injected by Node.js** into each file.

That is why they appear in the **Local scope**.

### \_\_dirname

```javascript
__dirname =
  '/home/aman/nodejs_course/04_fundamental_of_nodejs/40_Module Object';
```

- Absolute path of the **directory** where the current file exists
- It shows **which folder the file belongs to**

### \_\_filename

```javascript
__filename =
  '/home/aman/nodejs_course/04_fundamental_of_nodejs/40_Module Object/app.js';
```

- Absolute path of the **current file**
- Includes file name

### exports

```javascript
exports = {};
```

- exports is an object used to **export values from a module**
- It is another way of using module.exports

Example:

```javascript
exports.add = add;
```

### module object

Each file has its **own module object**.

It contains multiple properties:

### module.exports

- The object that is actually returned when a module is required
- Values assigned to exports are stored here

### module.children

```javascript
children = [];
```

- Contains the list of modules **imported by the current file**
- Example: add.js, product.js
- If this file imports another module, it will appear in children

### module.parent

- If a file is imported by another file, parent will store that module
- If the file is run directly, parent is null

### module.isPreloading

- Default value is false
- Becomes true when a module is loaded using:

```javascript
   node --require ./math.js app.js
```

- This means math.js is loaded **before** app.js

### module.paths

It contains an array of paths:

```javascript
[
  '/home/aman/.../node_modules',
  '/home/aman/node_modules',
  '/home/node_modules',
  '/node_modules',
];
```

- Used to resolve **external modules**
- When we install modules like axios, Node.js searches only inside node_modules
- It checks node_modules in the current folder, then parent folders, up to root
- That is why multiple paths exist

### Why these variables are in local scope

These variables exist in local scope because **Node.js wraps every file internally** with (function (exports, require, module, \_\_filename, \_\_dirname) {

// Your code is here

});

and provides them to that file only.

This function is called Module Wrapper Function

That is why:

- They are available automatically
- They are local to each file
- Each file gets its own values
