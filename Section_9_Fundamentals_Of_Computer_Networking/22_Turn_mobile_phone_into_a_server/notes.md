### Steps:

    1. Install termux app
    2. Install node js
    3. Create a file using nano command
    4. Inside the file create a nodejs http server

server code ex:

```javascript
    const http = require('http')
    const server = http.createServer((req,res)=>{
            res.writeHead(200,{'content-type':'application/json'})
            res.end('{'message':'Hello world'}')
        })
    server.listen(4000,()=>{
        console.log('Http server is running ')
    })
```

    5. Start the server
    6. Find the ipv6 address of your mobile inside the mobile settings and copy that
    7. Inside your browser type [yourIpv6address]:4000
    8. This server can be accessed from anywhere as ipv6 are by-default public ip.
    9. This ip will only work untill your mobile device ip doesn't change. (it may change once you turn your mobile data off).

---

Using termux application in mobile phone, we can run a nodeJS server. And since IPv6 is public, we can access it across internet.
