# Readable Stream States

1. **Initial State**:
   - The stream is newly created. It hasn't started flowing or been paused, so no data is being consumed, and the stream hasn't ended. At this point, no reading action has been taken.
   - **`readableFlowing`: `null`**
   - **`readableEnded`: `false`**
   - **`isPaused()`: `false`**

2. **Flowing State**:
   - The stream is actively reading and pushing data automatically to the consumer via the `'data'` event. The stream hasn’t reached the end of its data yet.
   - **`readableFlowing`: `true`**
   - **`readableEnded`: `false`**
   - **`isPaused()`: `false`**

3. **Paused State**:
   - The stream is paused, meaning it’s not pushing data automatically.
   - **`readableFlowing`: `false`**
   - **`readableEnded`: `false`**
   - **`isPaused()`: `true`**

4. **Ended State**:
   - The stream has consumed all available data and emitted the `'end'` event. No more data will flow, and the stream is considered finished.
   - **`readableFlowing`: `true`**
   - **`readableEnded`: `true`**
   - **`isPaused()`: `false`**

---

### Readable Stream States Comparison Table

| Stream State      | `readableFlowing` | `readableEnded` | `isPaused()` |
| ----------------- | ----------------- | --------------- | ------------ |
| **Initial State** | `null`            | `false`         | `false`      |
| **Flowing State** | `true`            | `false`         | `false`      |
| **Paused State**  | `false`           | `false`         | `true`       |
| **Ended State**   | `true`            | `true`          | `false`      |

---

**we aslo have events names like resume, pasue, etc.**

```javascript
readStream.on('pause', () => {
  console.log('Stream Paused');
});
readStream.on('resume', () => {
  console.log('Stream Resumed');
});
```

- **Bydefault resume event fire when data event is fired.**

* `Note` : When stream is ended(end event) then also it remains true.
