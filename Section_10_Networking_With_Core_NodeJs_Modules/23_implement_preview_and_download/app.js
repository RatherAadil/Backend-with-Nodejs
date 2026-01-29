import { open, readdir, readFile } from 'node:fs/promises';
import http from 'node:http';
import mime from 'mime-types';

const server = http.createServer(async (req, res) => {
  const path = decodeURIComponent(req.url);

  if (path === '/favicon.ico') return res.end('No favicon available');
  if (path === '/') {
    serveDirectory(path, res);
  } else {
    try {
      const [url, queryString] = path.split('?');
      const queryParams = {};
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
      });

      const fileHandle = await open(`./storage${url}`);
      const stat = await fileHandle.stat();
      if (stat.isDirectory()) {
        serveDirectory(url, res);
      } else {
        const readStream = fileHandle.createReadStream();
        res.setHeader('Content-Type', mime.contentType(url.split('/')[1]));
        res.setHeader('Content-Length', stat.size);
        if (queryParams.action === 'download') {
          res.setHeader(
            'Content-Disposition',
            `attachment;filename=${url.split('/')[2]}`,
          );
          console.log(stat.fileName);
        }
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
    dynamicHTML += `${item}  <a href=".${path === '/' ? '' : path}/${item}?action=open">Open</a> <a href=".${path === '/' ? '' : path}/${item}?action=download">Download</a><br>`;
  });
  const htmlBoilerPlate = await readFile('./FrontEnd/index.html', 'utf-8');
  res.end(htmlBoilerPlate.replace('${dynamicHTML}', dynamicHTML));
}

server.listen(80, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
