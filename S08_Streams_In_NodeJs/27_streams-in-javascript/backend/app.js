import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('Content-Type', 'text/txt');

  const fileHandle = await fs.open('abc.txt');
  const readStream = fileHandle.createReadStream({
    highWaterMark: 2,
  });

  readStream.on('data', (chunk) => {
    res.write(chunk);

    readStream.pause();

    setTimeout(() => {
      readStream.resume();
    }, 100);
  });

  readStream.on('end', () => {
    res.end();
  });
});

server.listen(4000, 'localhost', () => {
  console.log('Server Started');
});
