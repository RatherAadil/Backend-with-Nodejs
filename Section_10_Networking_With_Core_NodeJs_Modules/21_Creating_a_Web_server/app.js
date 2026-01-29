import { createReadStream } from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === '/') {
    const readStream = createReadStream('./public/index.html');
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`./public${path}`);
    readStream.pipe(res);
    readStream.on('error', (err) => {
      const fileName = path.split('/')[1];
      res.statusCode = 404;
      res.end(`No File named "${fileName}" exist`);
    });
  }
});
server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
