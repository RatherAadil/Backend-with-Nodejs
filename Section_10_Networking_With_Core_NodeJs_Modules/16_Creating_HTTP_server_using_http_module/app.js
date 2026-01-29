import http from 'node:http';
const server = http.createServer();

server.on('request', (request, response) => {
  console.log('Got the request');
  console.log(request.url);
  console.log(request.method);
  response.setHeader('Access-Control-Allow-origin', '*');
  response.setHeader('Content-Length', '22');
  response.write('Hello from Http server');

  console.log(request.headers);
  request.on('data', (chunk) => {
    console.log('Got data on request');
    console.log(chunk.toString());
  });
  //   response.end();
});

// server.on('connection', (socket) => {
//   console.log(socket);
//   socket.end('Hi from http server');
// });

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
