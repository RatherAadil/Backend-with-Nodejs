## Piping using pipeline()

- In Node.js, pipeline() is the recommended way to pipe streams together.
- It not only connects streams but also automatically handles errors and cleans up resources. ✅

### How to Use

```javascript
import { pipeline } from 'stream';
pipeline(readStream, writeStream, (err) => {
  if (err) {
    console.error('❌ Pipeline failed:', err);
  } else {
    console.log('✅ Pipeline finished successfully!');
  }
});
```
