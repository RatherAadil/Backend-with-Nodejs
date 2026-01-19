## Piping & Redirection of Data Streams

- In Node.js and terminals, data streams can be piped or redirected to transfer data efficiently between processes or files.
- Piping streams from terminal will only work in linux.
- So we should use WSL.

### Piping Streams

With piping, the output (stdout) of one process becomes the input (stdin) of another.

- `Syntax:`

```
command1 | command2
```

- `Example:`

```
  echo hii | node index.js
```

- echo hii outputs to stdout

* That stdout is piped into stdin of node index.js

#### Another Example:

```
node script.js | node index.js
```

- The stdout of script.js becomes the stdin for index.js

* `📌 Note`: The pipe | only connects stdout → stdin

---

### Redirection of Data Streams

Redirection work's with extra file, means the output of a process is stored in a file.

`Command`:

```
node script.js > command.txt
```

- Here the stdout stream of script.js is stored in command.txt

**Similarly**,

```
  node script.js 2> command.txt
```

- now stderr stream of script.js is stored in command.txt

* `2` is indicating the filedescriptor.

* if we want to write both we will use:

```
  node script.js > command.txt 2>> command.txt
```

Now,

- If we want to read the data of file, we can use

* `  commands:`

```
  node index.js < command.txt
```

It will read the data from command.txt in streams and pass it to stdin of index.js
