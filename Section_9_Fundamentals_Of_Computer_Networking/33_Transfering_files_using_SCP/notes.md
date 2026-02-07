# 📂 File Transfer using SCP (Secure Copy Protocol)

### 🛠 What is SCP?

**SCP (Secure Copy Protocol)** is a command-line utility that allows you to copy files and directories securely between hosts on a network.

- **Security:** It uses the same encryption and authentication as **SSH**.
- **Legacy:** It replaces the older, insecure **FTP**, which sent data in plain text.

---

### ⚙️ SCP Command Syntax

The basic structure of an SCP command is:

```bash
scp [options] [source] [destination]

```

---

### 📤 Local → Remote (Upload)

Use this when you want to send a file from your machine to a server.

**Command:**

```bash
scp myfile.txt aadil@192.168.1.9:/home/aadil/Documents/

```

**Breakdown:**

- `myfile.txt`: The source file on your local machine.
- `aadil@192.168.1.9`: The remote username and IP address.
- `:/home/aadil/Documents/`: The specific path on the remote server where the file will be saved.

---

### 📥 Remote → Local (Download)

Use this to pull a file from a remote server to your local machine.

**Command:**

```bash
scp aadil@192.168.1.9:/home/aadil/report.pdf ./Downloads/

```

**Breakdown:**

- `aadil@192.168.1.9:/home/aadil/report.pdf`: The source path on the remote machine.
- `./Downloads/`: The destination folder on your local computer.

---

### 📦 Folder Transfer (Recursive)

To transfer an entire directory, you must use the `-r` flag.

**Command:**

```bash
scp -r ./myProject aadil@192.168.1.9:/home/aadil/

```

---

### 🔗 Relation with SSH

SCP is essentially "SSH with file copying capabilities."

- It uses **Port 22** by default.
- If you have an SSH server running on the target machine, SCP is already supported.
- It inherits all SSH security features, including **Key-based authentication**.

---

### 🆚 SCP vs SFTP

| Feature           | SCP                                | SFTP                                 |
| ----------------- | ---------------------------------- | ------------------------------------ |
| **Operation**     | Non-interactive (One-shot command) | Interactive (Session-based)          |
| **Speed**         | Generally faster for large files   | Slower due to overhead               |
| **Functionality** | Copying only                       | Copy, Delete, List, and Rename files |

> **Summary:** SCP acts as a "secure courier," moving your files under the protective umbrella of SSH encryption.
