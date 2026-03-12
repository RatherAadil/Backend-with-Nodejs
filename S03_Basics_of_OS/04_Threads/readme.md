# Threads

Thread: A thread is a lightweight unit of execution within a process.

### Process vs Thread:

- Processes have separate memory; threads share memory within the same process.
- Starting a new process (spawning) is heavy and slow, but starting a thread is fast and lightweight.

## Creating threads in node js:

```js
const { Worker } = require('worker_threads');
new Worker('./a'); //a is the file name
```

### Why Use Threads:

- Threads enable concurrent or parallel execution of multiple tasks within one process, improving responsiveness and performance.

## Multithreading in Node.js:

By default, JS code in Node.js runs on a single thread (event loop). Since Node.js v12+, you can use the `worker_threads module` to run true multithreaded (parallel) code.

```js
const { Worker } = require('worker_threads');
new Worker('./a');
new Worker('./b');
new Worker('./c');
```

## Concurrency vs Parallelism:

- Concurrency: Multiple tasks progress “together” (can be interleaved on a single core).

* Parallelism: True simultaneous execution (multiple tasks actually run at the same instant on multiple cores).

## System Monitoring:

- Even single-process apps often have multiple internal threads (can be \* seen in system monitors).
- More threads can be created for parallel heavy computations.
- Node.js is NOT only single-threaded: It is truly multithreaded—if you use worker threads. Older Node.js versions (pre-2019) did not support this.

### Performance Tip:

Multithreading is essential for efficient CPU-bound work. Communicating between threads has some overhead, but overall saves significant time for parallel tasks.

## Can a process exist without threads?

when we spawn a process a single thread is created along with that and that thread gets executed not the entire process is loaded into the processor.

So, every process has a single thread.
