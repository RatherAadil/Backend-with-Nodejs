## Understanding preflight request

For non-simple requests (e.g., with custom headers or methods like PUT, DELETE), the browser first sends an OPTIONS request called a preflight to check if the server allows it.

    If the server responds with proper headers, only then the actual request is made.

    Simple Request
    GET, POST (with basic content types)
    No preflight

    Complex Request
    PUT, DELETE, PATCH, or with custom headers
    Preflight (OPTIONS) sent

- For more information study on MDN
