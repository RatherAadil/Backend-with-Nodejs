### Creating Client using http module

```javascript
import http from 'http';
const clientRequest = http.request();
```

- If we don't define any port or IP address, By Default it will start on PORT 80 at all available IPs.
- It returns a writable Stream
- If we don't specific the Method, by default it is GET.

```javascript
clientRequest.write('Hi From Client');
```

- For reading the data received from server.

```javascript
clientRequest.on('response', (response) => {
  // Here the reponse is a readable stream.
  response.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});
```
