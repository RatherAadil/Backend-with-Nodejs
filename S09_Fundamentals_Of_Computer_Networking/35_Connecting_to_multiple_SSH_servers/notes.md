**🗝️ SSH Config File and Multiple Server Connections**

**🔹 What is an SSH Config File?**
`~/.ssh/config` is a configuration file used to create shortcuts for SSH. Through this, you can define the IP, User, and Key for multiple servers. This means you no longer need to type long commands repeatedly.

---

### 🔹 Config File Structure

You can create or edit this file using `nano ~/.ssh/config`. Here is how you define multiple servers:

# Shortcut for Home Server

```ssh
Host local-server
   HostName 192.168.0.104
   User anurag
   IdentityFile ~/.ssh/local-key
```

# Shortcut for AWS Cloud Instance

```ssh
Host aws-server
   HostName 65.2.122.85
   User ubuntu
   IdentityFile ~/.ssh/aws-key

```

### 🔹 Parameter Breakdown

| Keyword          | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Host**         | A nickname or shortcut (e.g., `local-server` or `aws-server`). |
| **HostName**     | The Server's IP Address or domain name.                        |
| **User**         | he username used for login (e.g., `ubuntu`, `root`, `anurag`). |
| **IdentityFile** | TThe private key used for authentication.                      |

---

**🔹 Without Config File**
A normal SSH command looks like this:

    sh -i ~/.ssh/aws-key ubuntu@65.2.122.85

**🔹 With Config File**
After setting up the config file, you simply type:

    ssh aws-server` or `ssh local-server

SSH will automatically pick the correct IP, User, and Key ✅.

**🔹 Benefits**

- **Saves Time** ⏳
- **Easy Management:** Managing multiple servers becomes effortless 🖥️.
- **No Memory Load:** You don't need to remember complex IPs and keys 🧠.

**👉 Bottom Line:**
This allows you to easily create SSH connections for multiple servers without any confusion.
