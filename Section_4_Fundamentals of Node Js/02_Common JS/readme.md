## What is a Module?

👉 **A module is just a file.**

In Node.js, **every JavaScript file is treated as a module**.

A module is used to:

- Organize code properly
- Avoid messy and lengthy files
- Reuse code in multiple places

This is similar to **components in React**, where each component is written in a separate file.

## Why do we use modules?

If we write all functions in one file, the code becomes:

- Hard to read
- Hard to maintain
- Hard to reuse

So we separate related logic into different files (modules).

## Example: Creating functions

```javascript
function sum(...nums) {
  return nums.reduce((curr, accu) => {
    return curr + accu;
  });
}
function product(...nums) {
  return nums.reduce((curr, accu) => {
    return curr * accu;
  });
}
```

Keeping all these in one file looks ugly.So we place them **systematically** inside modules.

## Exporting a single value from a module

### sum.js

```javascript
function sum(...nums) {
  return nums.reduce((curr, accu) => curr + accu);
}
module.exports = sum;
```

### product.js

```javascript
function product(...nums) {
  return nums.reduce((curr, accu) => curr * accu);
}
module.exports = product;
```

## Importing a module using require()

```javascript
const sum = require('./sum');
const product = require('./product');
```

## Understanding require() clearly

- require() is a **function**
- It accepts a **string path**
- It finds and executes the file
- It returns **module.exports**

Example:

```javascript
module.exports = 'hello';
```

```javascript
const data = require('./file');
console.log(data); // "hello"
```

👉 Whatever you assign to module.exports is what require() returns.

## Exporting multiple values from one file

### math.js

```javascript
function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}
function product(...nums) {
  return nums.reduce((a, b) => a * b);
}
module.exports = { sum, product };
```

### Importing using destructuring

```javascript
const { sum, product } = require('./math');
```

## Why can’t we export multiple values directly?

Because:

- require() is a function
- A function can return **only one value**

So we **wrap multiple values** inside:

- an object {}
- or an array \[\]

Example:

```javascript
module.exports = [sum, product];
```

## Important: module.exports default value

Initially:

```javascript
console.log(module.exports);
```

Output:

```javascript
{
}
```

Node.js gives every module an **empty object by default**.

## Two ways to export multiple values

### Method 1: Replace the object

```javascript
module.exports = { sum, product };
```

### Method 2: Add properties (preferred for clarity)

```javascript
module.exports.sum = sum;
module.exports.product = product;
```

👉 Since module.exports is already an object, we just attach values to it.

## Final Summary (One-Line)

> A module is a file that exports values using module.exports, and those values are imported using require(), which always returns whatever is assigned to module.exports.
