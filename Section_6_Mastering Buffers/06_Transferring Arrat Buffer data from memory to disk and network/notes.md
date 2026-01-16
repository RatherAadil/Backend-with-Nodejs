## Store Buffer in disk

- done using plain text(that too decoded from buffer), viewdata and typed array.

```js
import { writeFile } from 'node:fs/promises';

const buffer = new ArrayBuffer(5);
const uInt8Arr = new Uint8Array(buffer);
uInt8Arr[0] = 0x41;
uInt8Arr[1] = 0x61;
uInt8Arr[2] = 0x64;
uInt8Arr[3] = 0x69;
uInt8Arr[4] = 0x6c;
console.log(uInt8Arr);

// const decoder = new TextDecoder('utf-8');
// const decodedName = decoder.decode(uInt8Arr);
writeFile('./name.txt', uInt8Arr);
```

## Transfer Buffer from Ram to Network

```js
import http from 'http';

const a = new ArrayBuffer(8);
const uint8Array = new Uint8Array(a).fill('0x62');

startServer(uint8Array);

function startServer(responseData) {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/txt; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url === '/favicon.ico') {
      res.end();
      return;
    }
    res.end(Buffer.from(responseData.buffer));
  });

  server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
  });
}
```

## Take Data from Network to Ram

- assuming above server is live.

```js
fetch('http://localhost:3000')
  .then((res) => res.arrayBuffer())
  .then((data) => {
    const decoder = new TextDecoder('utf-8');
    console.log(decoder.decode(data));
  });
```
