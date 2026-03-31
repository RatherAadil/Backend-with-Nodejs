# What is SOP?

- A browser security feature that restricts how scripts from one origin can access data from another origin.

## What is an Origin?

    * Defined as: Protocol + Hostname + Port
    * Any change in these three makes it a different origin.

## What SOP Blocks:

    * Reading cookies, localStorage, or sessionStorage of another origin.
    * Reading the response body of cross-origin fetch() or XMLHttpRequest.
    * Accessing DOM of a cross-origin iframe.

## What SOP Allows:

    * Sending requests to other origins (e.g., fetch, <img>, <script>).
    * Loading images, styles, scripts, and fonts from other origins (read-only).
    * Embedding content in cross-origin iframes (no access to internal content).

## Why SOP Exists:

    * To protect users from malicious websites trying to steal data from other sites (like your bank or email).
    * Prevents cross-site attacks like CSRF and data theft.

## Who Enforces SOP?

    * The browser, automatically and always enabled.

## Can You Disable SOP?

    * No. SOP is enforced in all modern browsers and cannot be turned off.

## How to Allow Cross-Origin Access (Safely):

    * Use CORS (Cross-Origin Resource Sharing) — configured on the server.
    * Use postMessage API — for secure communication between iframes/windows.
