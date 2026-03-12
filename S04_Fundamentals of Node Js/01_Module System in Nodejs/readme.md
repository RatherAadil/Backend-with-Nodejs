# Module Systems in Node.js

Node.js supports **two types of module systems** that allow us to organize code into separate files and reuse it.

---

## 1. CommonJS Module System

- This is the **default module system in Node.js**
- Uses `require()` to import modules
- Uses `module.exports` or `exports` to export code
- Files usually have the `.js` extension

### Example

```js
// math.js
module.exports.add = (a, b) => a + b;

// app.js
const math = require('./math');
console.log(math.add(2, 3));
```

## 2\. ES6 (ES Modules) System

- Introduced later and based on modern JavaScript standards
- Uses import and export keywords
- To use ES modules in Node.js:

  - Either use .mjs extension
  - Or add "type": "module" in package.json

### Example

```javascript
// math.js  export const add = (a, b) => a + b;  // app.js  import { add } from "./math.js";  console.log(add(2, 3));
```

## Variable Scope: Node.js vs Browser

### Question

`  var num = 5;  `

Is num in **local scope or global scope**?

### Answer

#### In Node.js

- num is in the **local scope of the module**
- Every file in Node.js is treated as a **separate module**
- Variables declared with var, let, or const are **NOT global by default**

```javascript
// file1.js  var num = 5;  console.log(num); // ✅ Accessible here
```

But in another file:

```javascript
// file2.js  console.log(num); // ❌ Error: num is not defined
```

#### In the Browser

- If the same code is written in a browser JavaScript file:

```javascript
var num = 5;
```

- num becomes part of the **global scope**
- It is attached to the window object

```javascript
console.log(window.num); // ✅ 5
```
