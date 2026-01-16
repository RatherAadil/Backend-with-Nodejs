## Differences between CommonJS (CJS) and ES6/MJS module systems in Node.js. --

## Loading and main thread

- CommonJS modules load synchronously: when `require` runs, the file is read and loaded on the main JavaScript thread, which can block the event loop for large files.
- ES6/MJS modules load asynchronously: the engine reads module files on a separate thread, so the main thread stays more responsive while loading, which is better for servers and heavy modules. Execution of the code itself still happens on the main thread in both systems.

## File extensions and configuration

- In CommonJS, file extensions are optional and almost any file type can be loaded with `require` if a full path is given (even non‑JS files like images or videos).
- In ES6/MJS, you must include the correct file extension, and only `.js`/`.mjs` (and a few specific types) are allowed. In Node, ES modules need `"type": "module"` in `package.json`, while CommonJS is the default and does not require configuration.

## this, hoisting, and top-level await

- In CommonJS, top-level `this` points to `module.exports` by default (an object that can be mutated).
- In ES6/MJS, top-level `this` is `undefined`, and `import` statements are hoisted: imported modules run before the rest of the file code, regardless of where the `import` appears. `require` calls are not hoisted and follow normal execution order.
- ES6/MJS supports top-level `await` directly in the module, while CommonJS only allows `await` inside async functions (often using an async IIFE pattern).

## Export model and multiple exports

- CommonJS effectively exports a single value because `require` returns only one value; to expose many things, they must be placed into one object or array that is exported.
- ES6/MJS allows multiple named exports plus one default export, which can all be imported together using the `import` syntax (default import plus named imports).

## Strict mode and other differences

- ES6/MJS modules run in strict mode by default, enforcing rules like disallowing implicit global variables and some unsafe patterns.
- CommonJS modules are not in strict mode by default; strict mode must be enabled manually if desired. ES modules also use `import.meta` (rather than `__filename`/`__dirname`) for file metadata, and while CommonJS is still more widespread in the Node ecosystem, the video emphasizes that ES modules are generally more modern and powerful, so the course mainly uses ES6 modules.
