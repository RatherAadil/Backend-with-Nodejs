import http from 'http';

const buffer = new ArrayBuffer(5);
const uInt8Arr = new Uint8Array(buffer);
uInt8Arr[0] = 0x41;
uInt8Arr[1] = 0x61;
uInt8Arr[2] = 0x64;
uInt8Arr[3] = 0x69;
uInt8Arr[4] = 0x6c;

startServer(uInt8Arr);

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
