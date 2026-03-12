## 🔹 What is a Shebang?

A **shebang** is the **first line** of a script that tells the **operating system**👉 **which program (interpreter)** should run this file.

- Purpose:
  - Tells the operating system which interpreter should execute this file
  * when the script is run directly (without typing `node`, `python`, etc.).

It allows you to run a script **directly**, without typing node, python, etc.

## 🔹 Why is Shebang Used?

Without shebang:

```bash
   node app.js
```

With shebang:

```bash
   ./app.js
```

👉 Cleaner👉 Feels like a real command👉 Used in real-world Linux & server environments

## 🔹 Shebang Syntax

```javascript
   #!
```

⚠️ **No space** between #! and path⚠️ **No quotes**

## 🔹 Common Interpreters

| Language | Shebang                  |
| -------- | ------------------------ |
| Node.js  | `#!/usr/bin/env node`    |
| Python   | `#!/usr/bin/env python3` |
| Bash     | `#!/bin/bash`            |
| Shell    | `#!/usr/bin/env sh`      |

✅ **Best practice:** use /usr/bin/env

## 🔹 Why /usr/bin/env is Recommended?

Different systems install interpreters in different paths.

❌ Hard-coded path:

```javascript
   #!/usr/bin/node
```

✅ Portable & safe:

```javascript
   #!/usr/bin/env node
```

👉 Automatically finds node in your system PATH👉 Works across Linux & macOS

## 🔹 Rules of Shebang (VERY IMPORTANT)

1. Must be **the FIRST line** of the file
2. No spaces before `#!`
3. No quotes around interpreter path
4. Interpreter path must exist
5. File must be **executable**
6. Mostly works on **Linux / macOS**

## ❌ Invalid Examples

```javascript
   #!/ "usr/bin/node"   # quotes not allowed
    #! /usr/bin/node     # space after #! not allowed
    // #!/usr/bin/node   # not first line
```

## ✅ Valid Examples

```javascript
   #!/usr/bin/node
```

```javascript
   #!/usr/bin/env node   # recommended
```

## 🔹 Making a File Executable

Shebang alone is NOT enough.

Run this command once:

```javascript
   chmod +x app.js
```

Now you can run:

```bash
   ./app.js
```

## 🔹 Example: Node.js Script

### app.js

```javascript
   #!/usr/bin/env node
   console.log("Hello World");
```

### Run:

```bash
  chmod +x app.js  ./app.js
```

Output:

```bash
   Hello World
```

## 🔹 Common Problems & Solutions

### ❓ Permission denied

✔ Solution:

```bash
   chmod +x filename
```

### ❓ Script not running

✔ Check:

- Shebang is on **line 1**
- No spaces before #!
- Correct interpreter

### ❓ Interpreter not found

✔ Use:

```javascript
   #!/usr/bin/env node
```

## 🔹 Does Shebang Work on Windows?

❌ Not natively

✔ Works in:

- Git Bash
- WSL (Windows Subsystem for Linux)

## 🔹 Where Shebang is Used in Real Life

- CLI tools (npm, eslint, nodemon)
- Shell scripts
- Automation scripts
- Server startup scripts

## 🔹 Key Takeaways

- #! tells OS **which interpreter to use**
- Must be **first line**
- /usr/bin/env is **best practice**
- Needs **execute permission**
- Mostly for **Unix-based systems**
