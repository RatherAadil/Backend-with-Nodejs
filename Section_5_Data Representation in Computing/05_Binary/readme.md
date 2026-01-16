## 🧮 Binary Number System (Base-2)

---

#### 🔢 What is Binary?

Binary ek **Base-2** number system hai. Iska matlab isme sirf **do digits** ka use hota hai: **0** aur **1**.

| Binary Digit | Meaning     |
| ------------ | ----------- |
| **0**        | OFF / FALSE |
| **1**        | ON / TRUE   |

---

#### ⚙️ Why Binary?

Computers electrical signals par kaam karte hain, jinke do hi states ho sakte hain:

- ⚡ **ON** (High Voltage)
- ⚫ **OFF** (Low Voltage)

Binary in states ko perfectly represent karta hai:

- **1** **ON**
- **0** **OFF**

👉 Yahi wajah hai ki computer ka saara data (text, images, videos, audio) ultimately **binary (bits)** mein hi store aur process hota hai.

---

#### 🔄 Binary ↔ Decimal Conversion

##### 1️⃣ Binary Decimal (Step-by-Step)

**Example:** `1010` (Binary) ko decimal mein badalna.

**📐 Place Values Table:**
| Binary Bit | 1 | 0 | 1 | 0 |
| :--- | :--- | :--- | :--- | :--- |
| **Position** | 3 | 2 | 1 | 0 |
| **Power** |$2^3$ |$2^2$ |$2^1$ |$2^0$ |
| **Value** | 8 | 4 | 2 | 1 |

**🧮 Calculation:**

- $1 \times 8 = 8$
- $0 \times 4 = 0$
- $1 \times 2 = 2$
- $0 \times 1 = 0$

* Total: $8 + 0 + 2 + 0 = 10 \text{ (Decimal)}$

###### 💻 JavaScript Shortcut

```javascript
// Binary string to Decimal
parseInt('1010', 2); // Output: 10
```

---

##### 2️⃣ Decimal Binary (Reverse Process)

**Example:** `10` (Decimal) ko binary mein badalna.

**🧠 Logic:**

1. Number ko se divide karo.
2. Remainder ko side mein store karo.
3. Quotient ko tab tak divide karo jab tak woh na ho jaye.
4. Remainders ko **Bottom to Top** read karo.

**🧮 Visual Division:**

- $10 \div 2 = 5$ | Remainder: 0
- $5 \div 2 = 2$ | Remainder: 1
- $2 \div 2 = 1$ | Remainder: 0
- $1 \div 2 = 0$ | Remainder: 1

✅ **Binary Result:** `1010`

###### 💻 JavaScript Shortcut

```javascript
// Decimal to Binary string
(10).toString(2); // Output: "1010"
```

---

#### 💻 Binary in JavaScript

##### ✅ Syntax (Prefix)

JavaScript mein binary number represent karne ke liye `0b` prefix ka use hota hai.

```javascript
const binary = 0b1010; // Binary literal for 10
console.log(binary); // Output: 10
```

---

#### 🔢 Mathematical Operations

Binary numbers programming mein normal numbers ki tarah hi behave karte hain. Aap inpar koi bhi math operation kar sakte hain.

```javascript
const a = 0b101; // 5 decimal
const b = 0b011; // 3 decimal

console.log(a + b); // Output: 8 (5 + 3)
```

---

#### 🔁 One-Glance Summary

| Conversion         | Method      | JS Function        |
| ------------------ | ----------- | ------------------ |
| **Binary Decimal** | Bit         | `parseInt(str, 2)` |
| **Decimal Binary** | Divide by 2 | `num.toString(2)`  |

---

### 🎯 Pro Tip

Programming mein **Bitwise Operators** (`&`, `|`, `^`, `<<`, `>>`) binary levels par kaam karte hain, jo data compression aur encryption mein bahut kaam aate hain.
