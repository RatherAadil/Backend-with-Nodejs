## 🖥️ Remote Terminal Access using SSH\*\*

**🔑 SSH (Secure Shell)**
A network protocol that allows us to securely access the terminal of one computer from another computer. It is based on TCP and uses the default port 22.

**⚙️ SSH Setup and Installation**
Check if SSH is installed:

- `ssh -V` → Checks the SSH client version.
- `dpkg -l | grep openssh-client` → Checks if the Client is installed.
- `dpkg -l | grep openssh-server` → Checks if the Server is installed.

If not installed:

- `sudo apt update`
- `sudo apt install openssh-server`

Allow through Firewall (UFW):

- `sudo ufw allow ssh`

Check SSH server status:

- `sudo systemctl status ssh`

**🌐 Check Network Details**

- `hostname -I` → Provides the system's IP address.
- `whoami` → Provides the current user's username.

**🔗 Connecting (Client → Server)**
To login from one terminal (client) to another system (server):
`ssh username@ip_address`

Example:
`ssh aadil@192.168.1.9`

👉 **Here:**

- **aadil** = username of the server system
- **192.168.1.9** = IP address of the server system
  The system will then ask for a password, and access will be granted.

**🎯 Use Case**

1. Run the SSH server on one system.
2. Connect from another system using the client.
3. You can operate the other machine through a single terminal (as if it were local).

**💡 Summary**

- SSH provides secure remote access.
- Uses TCP port 22.
- Both client and server systems must be properly configured.
- Once connected, you get full terminal access to the other computer.
