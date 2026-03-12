## Cookies

Cookies are small pieces of data (up to 4KB) stored by the browser as key-value pairs.
Accessed in JS using document.cookie

Use case of cookies:

    The web, at its core (HTTP), is stateless. This means every time you click a link or load 
    a new page, the server treats it as a brand new, independent request. It has no memory of 
    who you are or what you did on the previous page.

    Imagine if every time you clicked "next" in an online store, the website forgot what was 
    in your cart. That would be terrible!

    Cookies solve this problem. They are a way to create state—a memory—across multiple 
    page requests. The server can say, "Ah, this request has a cookie with the ID user_12345.
    I remember user_12345 had a cart with a laptop and a mouse."

What Do Cookies Store?

    Key, value
    Domain
    Path
    Expiry date
    Size
    Flags like Secure, HttpOnly

Expiry

    By default, cookies are session-based (deleted when the browser closes).
    You can set custom expiry using:
        max-age (in seconds, preferred)
        expires (specific date)

Flags

    Secure: Cookie only works on HTTPS
    HttpOnly: Can’t be accessed via JS (adds security)
    SameSite: Controls cross-site requests (protects against CSRF)

Other Notes

    You can set multiple cookies.
    Special characters must be URL-encoded.
    Third-party cookies are cookies from domains other than the one in the browser’s address bar

Example:

```javascript
document.cookie;
```
