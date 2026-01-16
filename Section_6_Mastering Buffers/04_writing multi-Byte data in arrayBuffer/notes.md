Here is your content converted into a structured, easy-to-read Markdown format.

### ❓ Multi-Byte Data ka matlab kya?

Agar tu ek chhota number store kar raha hai jaise:

- **5** → single byte me fit ho jaata hai.
- **150** → still okay (fits in 1 byte unsigned).

**Lekin… Bigger numbers 👇**

- **300** → 1 byte me nahi aata.
- **16-bit numbers** (0 to 65535).
- **32-bit numbers** & **64-bit floats**.

> 👉 **Key Concept:** Inko multiple bytes me tod ke store karna padta hai. Aur ye bytes kaise arrange honge? Ye depend karta hai **Endianness** par.

---

### 🚀 Step 1: Multi-Byte Number Memory kaise store hota hai?

**Let’s store:** `500`

Uska binary representation (16-bit) hota hai:
`00000001 11110100`

Ye **2 bytes** me store hoga:

| Byte Position | Value (Decimal) | Value (Hex) |
| ------------- | --------------- | ----------- |
| **Byte 0**    | 244             | `F4`        |
| **Byte 1**    | 1               | `01`        |

---

### 🧭 Step 2: Endianness — Little Endian vs Big Endian

**📌 1. Little Endian (Intel CPUs default)**
Chhota byte first (**MSB last**).

> `[F4] [01]`

**📌 2. Big Endian**
Bada byte first.

> `[01] [F4]`

_Note: `ArrayBuffer`/`DataView` me tu choose kar sakta hai ki kaisa store karna hai._

---

### 🏗️ Step 3: Writing Multi-Byte Data with DataView

#### 🔧 Example 1: Little Endian (Default/Intel)

```javascript
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

// The 'true' argument enables Little Endian
view.setUint16(0, 500, true);

console.log(view);
```

**Output:**
`<f4 01>`

- **Explanation:** 500 split ho gaya → `244 (F4)` pehle, `1 (01)` baad mein.

#### 🔄 Example 2: Big Endian Version

```javascript
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

// The 'false' (or missing) argument enables Big Endian
view.setUint16(0, 500, false);

console.log(view);
```

**Output:**
`<01 f4>`
