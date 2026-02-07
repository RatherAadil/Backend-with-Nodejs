## Why we await twice when making a fetch call.

- It is because first await waits for response headers.
- Second await waits for response data.

* Eg.

  ```javascript
  const res = await fetch('http://example.com');
  // This will resolve when all response headers are finished and it get "\n\n"

  const data = await response.json();
  // This will resolve when response data is finished, socket ended and data is parsed.
  ```
