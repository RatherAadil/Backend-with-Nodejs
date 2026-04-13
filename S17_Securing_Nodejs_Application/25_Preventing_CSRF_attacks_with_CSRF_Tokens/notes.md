# Preventing CSRF Attack with CSRF Token

```
In case if our frontend and backend are same, then we'll generate a csrfToken and embed it in one of the hidden input field and on all the requests we'll validate it.
```

## Note:

```
How to send and receive CSRF tokens when frontend and backend are separate?

In that case we'll create a separate endpoint /csrf-token which will return the CSRF token to the frontend, and we'll call this endpoint just before making the form submit request and take the CSRF token and put it inside the form payload and verify on the server.
```
