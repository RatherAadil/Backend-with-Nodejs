## CPU Operations vs I/O Operations

**CPU Operations:** These are operations that require active and intensive calculation by the CPU.
Examples:

- Mathamatical Operations.
- Image Processing.
- Data Compression and Decompression.
- Complex Data Analysis.
- File Encryption.
  Solution: We should offload these task from main thread to workers_thread.

**I/O Operations (Input/Output):** These are the operations where the program spends most of its time waiting for an external resource to complete a task. The CPU is not doing heavy work.
Examples:

- Reading a File (Filesystem I/O).
- Making a Network Request (Network I/O).
- Database Operations.
- Calling Third-Party APIs.
- Sending an Email.

`Node.js Handles It Excellently.`
