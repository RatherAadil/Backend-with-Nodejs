## What npx does?

It searches for a file and executes it.

### npx searching steps

- Step 1:

  - First it searches for `package.json` file in current directory.

  * Inside that it searches for that executable key like `name` in our case.

  - If found, seaches for bin key

- Step 2:
  - Searches for node_modules\bin folder in current working directory, and executes this file.

* Step 3:
  - Seaches the package globally
  * To get the global package path use:

```
npm root -g
```

- Step 4:
  - Searches for the file in the npx cache, and if not found

* Step 5:
  - If it was not able to find the file in any above steps then it finds on `npm` and prompts the user to install the package if found on `npm` otherwise throws an error.

#### Note

- As of 13/01/2026 I was not able to execute the app.js by `npx hello` as it was opening the `app.js` in notepad.
- After using the `shebang` it was executing the `app.js`
  - ```shebang
    #!/usr/bin/env node
    ```
