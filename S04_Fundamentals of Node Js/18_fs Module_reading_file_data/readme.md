### Introduction to FS Module:

FS module is a internal (Core or Native) Module in NodeJS
We can import it as import fs from 'node:fs';

It has different methods for file operations each method is both (Synchronous And Asynchronous)

1. Understanding readFileSync(path, format)

   - It takes a path of file as argument and format of file in a string form. It's return value is a buffer.
   - we can convert buffer to string using .toString() on buffer.

   * If we know the exact format of the data which we want to read then we can pass the exact format and it will return the exact data not the buffer.
   * Example:

   ```javascript
   const content = fs.readFileSync('./index.html', 'utf-8');
   ```

   - It is a Synchronous method which blocks the main thread.
   - Generally, we avoid using readFileSync() method.

2. Understading readFile(path, format, callback)
   - It takes 3 arguments path of file, format of the file in string form and a callback function.
   - Call back function has two parameters (error, data)
   - While reading the file if any error comes it will come in error parameter and operation will stop.
   - If file reading operation is successful it will put the file data in data parameter in buffer format.
   - It is an Asynchronous method which does not block the main thread.
3. node:fs/promises wala readFile

   - node:fs/promises It only has Asynchronous methods for file operations
   - It is more optimized since it uses promises.
   - We should use fs methods from node:fs/promises only.

   * we can also provide the format to `readFile(path,format)` and then we can get the content not buffer

   * Example:

   ```javascript
   import fs from 'node:fs/promises';
   const content = await fs.readFile('./index.html', 'utf-8');
   console.log(content);
   ```
