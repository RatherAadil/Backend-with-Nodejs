## All those modules which are inside the node_modules are known as NPM Modules.

## In short Create Your Own Custom Package

### CJS (CommonJS):

- "type" ❌ not needed (default CommonJS)
- "main" → entry (index.js)
- "name" → package name
- use module.exports / require()

## ESM (ES6 Module):

- "type": "module" ✅ required
- "main" → entry (index.js)
- "name" → package name
- use export / import

## Hybrid (CJS + ESM):

- "name" → package name
- "main" → CJS entry (index.cjs)
- "module" → ESM entry (index.mjs)
- "exports" → define import/require paths

### Imports Alias

- Define custom path shortcuts in package.json →

```
  package.json:-> "imports": { "#myMath": "./myMath.js" }
```

before :

```
import {} from "./myMath.js"
Now: import {} from "#myMath"
```

## How to create a custom npm module.

- First create a folder by the name you want,inside a node_modules

* Create a package.json file.

```Javascript
{
    "main": "index.cjs",
    "module": "index.mjs",
    "exports":{
        "import":"./index.mjs",
        "require":"./index.cjs"
    }
}
```

- There are multiple things inside this json object, 'main' defines the entry point, 'module' is used for EJS and exports object is defines what to export based on common js or EJS

* Create the different files based on CJS and EJS like index.cjs and index.mjs

* Now you can use it inside any file.
* If you are using EJS then set the package.json type to module otherwise commonjs.

* Now we can deploy this package on NPM and then install using.

```javascript
npm i math
```

## How to publish your package on npm

- Create an account on npm
- In your project terminal go to the exact folder where your package is, in our case its maths inside node_modules
- Login on npm using command `npm login`

* Now go to package.json of your package and set the name of the package like `"name": "ratheraadil"`
* Also set the version of your package like `"version":"1.0.0"`
* Now publish the package on npm using `npm publish`
* Now anyone can use it using `npm i ratheraadil`
