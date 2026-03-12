## States of Writable Streams

1.  `Writable(Initial) State `-> Means we can write.

```javascript
writeStream.writable(); //return true if we can write, else false
```

    If the stream is ended we cannot write.

2.  ` Corked State`

    ```javascript
    writeStream.writableCorked() -> 0 means not corked , > 0 means corked
    ```

- `writeStream.cork()` -> Means data will load but cannot write
- `writeStream.uncork()` -> makes it to uncorked(Normal) state, and loaded data will be written.

3.  `Ended State`
    It means the stream has got the signal to be ended, but does not guarantee that all data is flushed.

```javascript
    writeStream.writeableEnded.
```

4.  `Finished State`

- This tell that the data has fully flushed to the destination.
- It takes some milliseconds after the ended State.

* we can check it through:

```javascript
writeStream.writableFinished;
writeStream.writableEnded;
```

- It also has errored state and destory method
