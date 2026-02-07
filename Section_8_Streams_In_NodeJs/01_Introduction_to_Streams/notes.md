## Introduction to Streams in Node.js

A stream in Node.js is a powerful way to handle data piece by piece (in chunks) rather than loading it all at once.

## What is a Stream?

- "A stream is like a pipeline through which data flows continuously."

**_Streams are ideal for:_**

- Reading/Writing large files
- Handling video/audio data
- Transferring data over networks
- Processing real-time input/output

### 🏞️ Real-Life Analogy:

Imagine a zipline in a village 🧺:

- You're sending a 10 GiB file from one house to another.
- You can’t carry it all at once—so you send it in baskets, one after another via zipline.
- Each basket is like a chunk of data.

* This way, the receiver starts processing before all baskets arrive.
  - ✅ Saves memory
  - ✅ Efficient and faster
  - ✅ No waiting for entire file to load

### 💡 Why Use Streams?

**_Without streams:_**

    🚫 The entire file is read into memory before processing — which blocks the event loop and wastes RAM.

**_With streams:_**

    ✅ Data is read bit-by-bit, so low memory usage, and non-blocking I/O.
