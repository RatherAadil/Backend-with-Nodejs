## Control Data Transfer Speed

- When we pipe data on socket it uses the maximum speed and handles the backpressure.

* But if we want to slow down or control the speed of data we have to manually handle the backpressure.

* We can pause the readStream for some milliseconds, So it will impact on data transfer.

* Eg.

```javascript
readStream.on('data', (chunk) => {
  socket.write(chunk);
  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 10);
});
```

        Browser pause and resume stream for handling backpressure.
