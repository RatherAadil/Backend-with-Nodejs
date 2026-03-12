## 🌐 Creating Our Own WAN (Wide Area Network)

### 🧠 Starting Point: 2 Routers, 2 PCs

Suppose you have two routers and two PCs:

- **Router A:** TP-Link
- **Router B:** Airtel

**The Setup:**

- **PC1** **TP-Link Router** (LAN 1)
- **PC2** **Airtel Router** (LAN 2)

### ❓ Can one PC access the other router?

- **TP-Link PC Gateway:** `192.168.0.1`
- **Airtel PC Gateway:** `192.168.1.1`
- 🔍 **Result:** If you type the Airtel IP into the TP-Link PC's browser, nothing will happen. Because the LANs are separate, they cannot "see" each other.

---

## 🛠 Using the WAN Port

### ✅ Step-by-Step Connection:

1. Plug an **Ethernet cable** into the **WAN port** of the TP-Link router.
2. Plug the other end of that cable into a **LAN port** of the Airtel router.

### 🔁 What Happens Now?

- The Airtel router assigns an IP address to the TP-Link router’s WAN port.
- The TP-Link router can now "talk" to the Airtel network.

> [!IMPORTANT]
> **One-Way Communication:** > \* TP-Link Airtel ✅
>
> - Airtel TP-Link ❌
> - Users on the Airtel side cannot see inside the TP-Link’s private network.

---

## 🔄 Two-Way Communication (Advanced)

If you want both routers to access each other's networks fully, you need a different approach:

### ✅ LAN-to-LAN Connection

1. Connect **LAN port** to **LAN port** via Ethernet.
2. **Disable DHCP** on one of the routers (to prevent IP conflicts).
3. **Manual Configuration:**

- Adjust Subnet settings.
- Define static Routing Rules.
- Manage IP addresses manually to avoid overlaps.

---

## 🏠 Real-World WAN Example (Home Internet)

Your home broadband router (Airtel, Jio, etc.) uses its **WAN port** to connect you to the world.

- **The Connection:** The cable in your WAN port goes to a remote router or "node" owned by your ISP.
- **The Chain:** That node connects to larger switches, which eventually connect to **undersea fiber cables** in the ocean.
- **The Result:** This chain is how your local home network becomes part of the global Wide Area Network (The Internet).
