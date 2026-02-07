import { createReadStream } from 'node:fs';
import { open, readdir, readFile } from 'node:fs/promises';
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  const path = decodeURIComponent(req.url);

  if (path === '/favicon.ico') return res.end('No favicon available');
  if (path === '/') {
    serveDirectory(path, res);
  } else {
    try {
      const fileHandle = await open(`./storage${path}`);
      const stat = await fileHandle.stat();
      if (stat.isDirectory()) {
        serveDirectory(path, res);
      } else {
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      }
    } catch (err) {
      const fileName = path.split('/')[1];
      res.statusCode = 404;
      res.end(`No File named "${fileName}" exist`);
    }
  }
});

async function serveDirectory(path, res) {
  const itemsList = await readdir(`./storage/${path}`);
  let dynamicHTML = '';
  itemsList.forEach((item) => {
    dynamicHTML += `<a href=".${path === '/' ? '' : path}/${item}"><li>${item}</li></a>`;
  });
  const htmlBoilerPlate = await readFile('./FrontEnd/index.html', 'utf-8');
  res.end(htmlBoilerPlate.replace('${dynamicHTML}', dynamicHTML));
}

server.listen(80, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
