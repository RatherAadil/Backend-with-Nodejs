# 📡 IPv4 Address & Subnet Mask – Easy Explanation

### 🔹 What is an IP Address?

**IP** stands for **Internet Protocol**.

- It is a **unique identifier** assigned to every device when it connects to a network (either the Internet or a Local Network).
- In local networks, the **Router** assigns the IP. In mobile or broadband connections, the **ISP** (Internet Service Provider) assigns it.
- **Important:** IP Protocol IP Address.
- **Protocol** = A set of rules.
- **Address** = Just one part of that protocol.

### 🔹 IPv4 Address Format

An IPv4 address is a **32-bit binary number**, divided into **4 octets** (8 bits each).

- **Example (Binary):** `11000000.10101000.00000000.00000001`
- **Example (Decimal):** `192.168.0.1`
- We write it in decimal format solely for **human readability**.

### 🔹 IPv4 Range

- **Minimum:** `0.0.0.0`
- **Maximum:** `255.255.255.255`
- `Total unique addresses:` $2^{32} = 4,294,967,296$

### 🔹 Reserved Address Range (IPv4 Limitations)

**127.0.0.0 – 127.255.255.255** Reserved for **Loopback Testing** (internal device testing).

- **Example:** `127.0.0.1` is the Loopback address (localhost).
- **Subnet mask:** `255.0.0.0`

---

### 🔹 What is a Subnet Mask?

A subnet mask is a 32-bit number used to divide an IP address into two parts: the **Network Portion** and the **Host Portion**.

**Example:**

- **IP:** `192.168.1.10`
- **Subnet Mask:** `255.255.255.0`
- **Binary:** `11111111.11111111.11111111.00000000`
- **Logic:** The first 24 bits represent the **Network**, and the last 8 bits represent the **Host**.

### 🔹 CIDR Notation

**CIDR** = Classless Inter-Domain Routing.
It is a shorthand way of writing a subnet mask.

**Example:**
`192.168.1.10/24`

- **/24** means the first 24 bits are for the network; the remaining 8 bits are for the host.
- **Equivalent mask:** `255.255.255.0`
