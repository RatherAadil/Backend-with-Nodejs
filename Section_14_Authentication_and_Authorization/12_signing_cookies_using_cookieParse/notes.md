# Cookie Signing with Cookie-Parser

- Use middleware, `cookieParser("secret")` to enable signing.

- Set a signed cookie:

```js
res.cookie('uid', 'value', { signed: true });
```

- Read signed cookie securely via:

```js
req.signedCookies.uid;
```

- If tampered, the cookie becomes undefined(false).
