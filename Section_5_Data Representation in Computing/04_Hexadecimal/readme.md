## 🖥️ Hexadecimal Number System (Base-16)

---

#### 🔢 What is Hexadecimal?

Hexadecimal ek **Base-16** number system hai jo computers mein data ko compress karke dikhane ke liye use hota hai.

Isme total **16 symbols** hote hain:

- **0–9** → Values se tak
- **A–F** → Values se tak

**Hex to Decimal Mapping:**

| Hex   | Decimal | Hex   | Decimal |
| ----- | ------- | ----- | ------- |
| **A** | 10      | **D** | 13      |
| **B** | 11      | **E** | 14      |
| **C** | 12      | **F** | 15      |

---

#### 📐 Place Value System

Hexadecimal mein har digit **16 ki power** ko represent karti hai.

**Conversion Example:** `1A` (Hex) Decimal

- Calculation:$(1 \times 16^1) + (10 \times 16^0)$
- Result: $16 + 10 = 26$

---

#### 📌 Why Use Hexadecimal?

Hexadecimal ko developers aur engineers isliye pasand karte hain kyunki:

- ✅ **Compact:** Ye lambe binary codes ko chhota kar deta hai.
- ✅ **Binary Friendly:** Iska binary ke saath direct rishta hai ( Hex digit = Binary bits).

**Common Use Cases:**

1. 🧠 **Memory Addresses:** RAM ke locations dikhane ke liye.
2. 🎨 **CSS Colors:** Jaise `#FF5733` (Red, Green, Blue ki intensity).
3. ⚙️ **Low-level programming:** Hardware interaction aur debugging mein.

---

#### 💻 Hexadecimal in JavaScript

##### ✅ Syntax (Prefix)

JavaScript mein hex number batane ke liye hum `0x` prefix ka use karte hain.

```javascript
const hex = 0x1a;
console.log(hex); // Output: 26
```

---

#### 🔄 Conversions in JS

**1️⃣ Hex String Decimal**
`parseInt()` function ka use karein aur radix dein.

```javascript
console.log(parseInt('1A', 16)); // Output: 26
```

- **"1A"** = Hex string
- **16** = Base

**2️⃣ Decimal Hex String**
Decimal number par `.toString(16)` apply karein.

```javascript
const num = 255;
console.log(num.toString(16)); // Output: "ff"
```

---

#### 📝 Important Points (Exam Tips)

- **Base:**
- **Symbols:** and
- **JS Prefix:** `0x` mandatory hai literals ke liye.
- **Storage:** hex digit exactly **4 bits** (nibble) occupy karta hai.
- **System:** Computer architecture aur machine code debugging mein standard hai.

---

#### 🧠 One-Line Memory Trick

> **Hexadecimal = 0 to 9 numbers + A to F characters (for 10-15).**
