# 🌐 Network Interfaces

### 📌 Definition

A **Network Interface** is the medium (mostly hardware) through which a device connects to the internet or any network. Each interface is assigned a **unique IP address**, which allows the device to be identified on the network.

---

### 💻 Internet Access Interfaces in a PC (Computer)

- **Wi-Fi (via Router)**
- The most common wireless connection.
- Speed and reliability depend on the router and distance.

- **Ethernet Cable (LAN)**
- A direct wired connection from the router to the PC.
- **Advantage:** Provides a stable, fast connection with no network loss.
- _Note:_ Not all modern PCs/Laptops have a built-in Ethernet port.

- **Bluetooth Tethering**
- Sharing internet from a Mobile to a PC via Bluetooth.
- **Requirement:** Bluetooth Tethering must be toggled **ON** in the mobile settings.
- It creates a **PAN** (Personal Area Network).

- **USB Tethering**
- Sharing internet from a Mobile to a PC via a USB cable.
- **Requirement:** USB Tethering must be enabled in mobile settings.
- It also creates a **PAN** and is generally more stable than Bluetooth.

> [!NOTE]
> In both Bluetooth and USB tethering, the PC is assigned a new IP address, acting as a completely different network interface.

---

### 📱 Internet Access Interfaces in a Mobile (Phone)

- **Wi-Fi** (via Router or Hotspot)
- **Bluetooth** (Tethering / PAN)
- **USB** (via PC or Tethering)
- **Cellular Data** (SIM card data) – 4G/5G

---

### 💡 Key Point

Every interface provides a different network path. If a device has multiple interfaces available (e.g., Wi-Fi + Ethernet), the **Operating System (OS)** decides which one to use based on priority settings.

**⚡ Example:**
If a PC is connected to Wi-Fi and simultaneously plugged in via USB tethering, both will assign different IP addresses. However, only one route will be active at a time (the one preferred by the OS).
