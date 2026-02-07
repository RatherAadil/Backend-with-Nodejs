# 🔍 Inspecting Port Numbers

### 📌 Source and Destination Port Concept

When one PC (**Source**) sends a request to another PC (**Destination**), both sides use a combination of **IP address + Port number**.

**Example:**

- **Source IP:** `192.168.0.4`
- **Destination IP:** `192.168.0.5`
- **Server Destination Port:** `80` (HTTP)

---

### ⚡ Source Port Assignment

The Source (the device sending the request) is also assigned a port number.

- This port is chosen from the **dynamic/private range** (49152 – 65535).
- This means every request uses a **temporary port**.

---

### 🛠 Inspect with Wireshark

Using tools like **Wireshark**, we can see exactly which source and destination ports are assigned to every packet.

**Example capture:**

1. **Source → Destination:** `192.168.0.4:50512` → `192.168.0.5:80`
2. **Destination → Source:** `192.168.0.5:80` → `192.168.0.4:50512`

---

### 🔄 Request–Response Cycle

- **Step 1:** Source (**S**) sends a request to Destination (**D**).
- **Step 2:** When the response comes back, **D** becomes the sender and **S** becomes the receiver (roles swap).
- In this process, both the **IP and Port are reversed**.

---

### 🌐 Real-life Example (Browser → Website)

When we open a website:

- **Source:** Our browser/PC (a random port is assigned from the 49152–65535 range).
- **Destination:** The website server (e.g., HTTP:80 or HTTPS:443).
- The **Request** goes to the destination.
- Upon the **Response**, the destination (server) becomes the source to send data back to us.

---

### 💡 Conclusion

Port numbers allow multiple requests to be managed simultaneously in a network without confusion. This is because every connection has a unique combination of:
**(Source IP + Source Port) + (Destination IP + Destination Port)**
