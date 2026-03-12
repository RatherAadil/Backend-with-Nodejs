1.  How Cookies Are Set from Server

        A cookie is sent from the server using the Set-Cookie header:

```javascript
        Set-Cookie: name=aadil
```

        When the browser receives this header in a response, it stores the cookie automatically (if rules match). And when the next request is sent to the server these cookies are sent via request headers to the server.

2.  HttpOnly Cookies

        Cookies with HttpOnly flag cannot be accessed via JavaScript (document.cookie).
        Only the server can set and read them — great for storing sensitive info (e.g., tokens).

3.  Accessing Cookies in Server

```javascript
const cookies = req.headers.cookie;
```

However, this gives a raw string. Use cookie-parser to parse:

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log(req.cookies); // parsed object
```

4.  Setting Cookies Using Express

```javascript
        res.cookie("name", "aadil", {
        maxAge: 1000 _ 60 _ 60, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: "strict"
        });
```

5.  Cross-Origin Cookie Sharing

        When making fetch or XHR calls to another domain:

        Fetch defaults to:
        credentials: "same-origin"

        Values can be:
        "omit" – never send cookies
        "same-origin" – send only if same origin
        "include" – always send (even cross-origin)

        Note: If credentials: "include" is used, the server must respond with:
        Access-Control-Allow-Credentials: true
        Otherwise, the browser will ignore the cookie.

6.  XHR vs Fetch: credentials: true

        In XHR, credentials are set via xhr.withCredentials = true;
        In Fetch, use credentials: "include"
