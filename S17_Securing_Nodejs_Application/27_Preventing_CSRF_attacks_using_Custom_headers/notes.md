# Preventing CSRF Attack using Custom Headers

We created a custom header named `x-csrf-token` (it could be anything) with some value say 12345, and include it in every sensitive request.

```ts
await fetch('/pay', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'x-csrf-token': '12345',
  },
});
```

- On the server, we validate its presence:

```ts
if (!req.headers['x-csrf-token']) {
  return res.send('CSRF Token Missing');
}
```

If the request doesn't include this custom header then the request is rejected.

## How does this header prevent CSRF Attack

- Browsers automatically include cookies in cross-site requests, which is what makes CSRF attacks possible.

* However, custom headers (like x-csrf-token) cannot be added to cross-origin requests by default. EX: via a form.

* When such headers are used, the browser sends a preflight (OPTIONS) request for custom headers or methods like PUT , PATCH , DELETE as part of the CORS mechanism, to check whether the server allows it or not.

* If the server does not explicitly allow the attacker’s origin, the browser blocks the request.
* As a result, the actual request with the custom header is never sent.

## What If an Attacker Tries to Send the Same Header?

An attacker cannot successfully send the same custom header because:

- Browsers enforce CORS restrictions
- Cross-origin requests with custom headers require server permission
- If the server only allows trusted origins, the attacker’s request fails during the preflight phase
