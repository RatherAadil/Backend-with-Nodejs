# 🖥️ MAC Address (Media Access Control Address)

### 📌 Definition

A **MAC Address** is a unique hardware identifier assigned to every network interface (Wi-Fi, Ethernet, Bluetooth, etc.) at the time of manufacturing.

- **Format:** 48-bit hexadecimal number (Example: `00:1A:2B:3C:4D:5E`).
- **Unique Interfaces:** Every single interface has its own distinct MAC address.

---

### 🔑 Role of MAC Address

#### 1. Permanent Identity

- **IP addresses** change frequently (Dynamic IP via DHCP).
- **MAC addresses** are fixed at the hardware level.
- This allows a device to be reliably identified within a **LAN (Local Area Network)**.

#### 2. Router's DHCP Table

When a device connects to a router:

- The router assigns an IP address.
- It stores a **MAC ↔ IP mapping** in its internal table.
- The next time that specific device connects, the router recognizes the MAC address and can easily identify it (often assigning the same IP address as before).

#### 3. Communication in LAN

If one device needs to send data to another device on the same LAN, the actual delivery happens based on the **MAC address**, not the IP address.

- The IP address acts as a logical layer, but hardware-level data delivery relies on the MAC address.

---

### 📱 Example

Imagine a laptop that can connect via both Wi-Fi and Ethernet:

- **Wi-Fi Interface:** Has its own MAC address (e.g., `88:79:23:AF:91:CD`).
- **Ethernet Interface:** Has a different MAC address (e.g., `00:1B:44:11:3A:B7`).
- The router treats these as **two separate devices** and assigns a unique IP address to each.

---

### ⚡ Key Point

| Feature       | IP Address              | MAC Address               |
| ------------- | ----------------------- | ------------------------- |
| **Type**      | Logical / Virtual       | Physical / Hardware       |
| **Stability** | Changeable (Dynamic)    | Permanent (Fixed)         |
| **Layer**     | Network Layer (Layer 3) | Data Link Layer (Layer 2) |

👉 This is why when you check your router's list of connected devices, the MAC address for every device is visible and used for management.
