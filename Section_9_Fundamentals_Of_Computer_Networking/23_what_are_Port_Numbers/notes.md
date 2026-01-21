# Port Numbers Explained

Port numbers are essential for running multiple network applications on a single device.

---

### Why Do We Need Port Numbers?

A single computer can run many networked applications (servers or services) at the same time. Each application listens on a different port number, even though they share the same IP address.

**Example:**

- Node.js server on **port 80**
- Live Server on **port 5500**
- React (Parcel) app on **port 1234**

All these can be accessed using the same IP (e.g., `192.168.1.8`), but different ports.

---

### How Requests Work

When a user sends a request to an IP address, the port number tells the computer which application should handle it.

**Example:** If you visit `192.168.1.8:4000`, your request goes to the app running on port 4000.

**The request contains:**

- **Source IP and port** (e.g., your laptop: `192.168.1.102:50234`)
- **Destination IP and port** (e.g., server: `192.168.1.8:4000`)

The browser automatically picks a temporary port for outgoing requests. When the server responds, the source and destination are swapped.

---

### Why Not Just Use IP Addresses?

- Without port numbers, only one network application could run on a device at a time.
- Ports allow multiple apps to communicate over the network simultaneously.
- Both clients (like browsers) and servers use ports to send and receive data.

---

### What Happens If You Don’t Specify a Port?

- If you enter just an IP address (e.g., `192.168.1.8`), browsers use **port 80** by default.
- **localhost** also points to the local IP (`127.0.0.1`) and uses port 80 unless you specify another port.
- Many services (like routers, YouTube, Google) use port 80 for web traffic.

---

### Port Ranges

| Range           | Name                  | Description                                  |
| --------------- | --------------------- | -------------------------------------------- |
| **0–1023**      | Well-Known Ports      | System or common services (e.g., HTTP on 80) |
| **1024–49151**  | Registered Ports      | For user or application processes            |
| **49152–65535** | Dynamic/Private Ports | Used temporarily by client applications      |

---

### Key Points

- There are **65,535** possible ports (0 to 65535).
- Ports are crucial for running multiple networked applications on one device.
- They help direct network traffic to the correct application.
- Dynamic/private ports are assigned automatically and closed after use.

---

### Summary

Port numbers make it possible for one computer to run many networked apps at once. They are used by both clients and servers to manage network communication. Understanding port numbers is important for networking and development.

> For more details on port ranges and common ports, see `ranges_of_ports.md` and `well_known_ports.md`.
