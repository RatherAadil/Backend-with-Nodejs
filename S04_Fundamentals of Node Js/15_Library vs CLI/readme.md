# Library vs CLI Packages

# 📂 Local vs Global Packages

## 1️⃣ What is a **Library**?

### 👉 Meaning

A **library** is code that you **use inside your program**.

You **import it** and **call its functions**.

### 👉 Simple words

> Library = **Helper code for your app**

### ✅ Examples

- react → helps build UI
- axios → helps make API calls
- lodash → helps with arrays & objects

### 📌 How you use a library

```javascript
import axios from 'axios';
```

➡ Used **inside code**, not from terminal.

### 📌 Key Points (Library)

- Used **in code**
- Improves app features
- Cannot be run directly from terminal
- Used by developers while writing code

## 2️⃣ What is a **CLI Package**?

### 👉 Meaning

A **CLI (Command Line Interface) package** is a tool you **run from the terminal**.

### 👉 Simple words

> CLI package = **Tool you run using commands**

### ✅ Examples

- npm → package manager
- npx → run packages
- create-react-app → create React project
- vite → project setup tool

### 📌 How you use a CLI package

```bash
   npx create-react-app myApp
```

➡ Used **in terminal**, not in code.

### 📌 Key Points (CLI Package)

- Used in **terminal**
- Helps create / build / manage projects
- Not imported in JS files
- Used before or during development

## 🔁 Library vs CLI Package (Table)

| Feature         | Library             | CLI Package             |
| --------------- | ------------------- | ----------------------- |
| Used where?     | Inside code         | Terminal                |
| Purpose         | Add features to app | Create / manage project |
| Imported?       | Yes                 | No                      |
| Run by command? | ❌ No               | ✅ Yes                  |

## 3️⃣ What is a **Local Package**?

### 👉 Meaning

A **local package** is installed **only for one project**.

### 👉 Simple words

> Local package = **Only this project can use it**

### 📌 Install Local Package

```bash
   npm install axios
```

### 📌 Where it is stored

📂 node_modules folder📄 Listed in package.json

### 📌 Key Points (Local)

- Used by **one project**
- Installed inside project folder
- Recommended for most libraries
- Safe & controlled

## 4️⃣ What is a **Global Package**?

### 👉 Meaning

A **global package** is installed **for your whole system**.

### 👉 Simple words

> Global package = **Can be used anywhere**

### 📌 Install Global Package

```bash
npm install -g nodemon
```

### 📌 Key Points (Global)

- Used from **any folder**
- Mostly CLI tools
- Not recommended for libraries
- Can cause version issues

## 🔁 Local vs Global Package (Table)

| Feature         | Local           | Global             |
| --------------- | --------------- | ------------------ |
| Scope           | One project     | Entire system      |
| Install command | npm install pkg | npm install -g pkg |
| Stored where?   | Project folder  | System             |
| Best for        | Libraries       | CLI tools          |

## 🧠 Easy Memory Trick 💡

- **Library** → _Used in code_
- **CLI Package** → _Used in terminal_
- **Local Package** → _Project only_
- **Global Package** → _System wide_
