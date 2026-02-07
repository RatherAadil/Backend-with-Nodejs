## HTTP Server using HTTP module

First, let's look at how a server is created using the basic HTTP module.

```javascript
import http from 'node:http';
const server = http.createServer();
```

- Here too, we would need to write "HTTP\n\n" (header) if we want to see the message in the UI.
- This is because if we connect using the "connection" event, it connects through the TCP.
- And the socket is the same as the TCP socket.

```javascript
server.on('connection', (socket) => {
  socket.end('HTTP/1.1 200 OK\n\nHii from http server');
});

// --- Comparing TCP with HTTP ---
// In TCP, we used to do it like this:

const server = net.createServer();
server.on('connection', (socket) => {
  console.log(socket);
  // Connection Event provides the socket of TCP
  // It will act same as TCP Connection.
  // We don't use this in HTTP.
});
```

- For HTTP, we use the "request" event.
- Here, we don't get a raw socket; instead, we get two objects: Request and Response.
- The Request is a Readable Stream.
- The Response is a Writable Stream.
- Both Request and Response are based on top of the socket (the socket itself was a Duplex Stream).

* Since the Request is a readable stream, we can use the .on property (like listening for 'data').
* Similarly, we can use the `.write` method on the Response since it's a writable stream.
* **Just remember:** we need to end the response because a writable stream must be closed with `.end()`.
* Alternatively, instead of just `.end()`, we can set the `"Content-Length"` header.

```javascript
server.on('request', (request, response) => {
  console.log('Got the request');
  // request.on("data", (chunk) => {
  // console.log(chunk.toString());
  // });
  response.setHeader('Content-Length', '23');
  response.write('Hello from http server.');
  response.end();
});
```

- The above code is equivalent to:

```javascript
const server = http.createServer((request, response) => {
  console.log('Got the request');

  request.on('data', (chunk) => {
    // This console.log value won't appear in the terminal
    // when you simply visit localhost or your ip_address:4000 in a browser.
    // This is because that is a GET request.
    // GET requests usually do not have a body (data payload).
    // Therefore, until a client (like Postman or a frontend fetch) sends data to your server,
    // this line will not execute.
    console.log(chunk.toString());
  });

  response.setHeader('Content-Length', '23');
  response.write('Hello from http server.');
  response.end();
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Server Started on port 4000');
});
```

---

## Final code:

```javascript
import http from 'node:http';
const server = http.createServer((request, response) => {
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

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000');
});
```

- when client will send the data using POST method, then only the request.on data event will get triggered in above code:

```javascript
request.on('data', (chunk) => {
  console.log('Got data on request');
  console.log(chunk.toString());
});
```

- Ex:

```javascript
const response = await fetch('http://192.168.65.27:4000', {
  method: 'POST',
  body: 'Hi, I am client',
});
```

---

### Key Points to Remember

- Har HTTP response me headers aur body hoti hai. Agar manually TCP socket pe likh rahe ho to \n\n important hota hai — ye signal deta hai ki headers khatam ho gaye aur ab body start ho rahi hai.
- Content-Length header dena optional hai lekin helpful hai jab aap .end() call nahi karte ho.
- server.listen() se server ko kisi port pe bind karte ho aur sunna start karta hai requests.
