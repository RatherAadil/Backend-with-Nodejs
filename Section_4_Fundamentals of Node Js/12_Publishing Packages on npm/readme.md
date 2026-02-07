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

## How to make any new updates on a packaga

- First go the the package and make the changes which you want.

* Then make sure to update the version in its `package.json file`, otherwise you cannot publish it on the same version.
* Then publish using `npm publish`
