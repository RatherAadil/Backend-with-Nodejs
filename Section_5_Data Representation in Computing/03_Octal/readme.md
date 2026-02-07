## 🧮 Octal Number System (Base-8)

#### 🔢 What is Octal Number System?

Octal Number System ek **Base-8** number system hai. Isme sirf **8 digits** use hote hain:

`0, 1, 2, 3, 4, 5, 6, 7`

❌ **Digits 8 aur 9 allowed nahi hote.**

#### 📐 Why Base-8?

Kyunki total 8 unique digits hote hain, isliye iske place values **powers of 8** mein hote hain.

**Place Values Table:**

| Position        | Value (Power) | Result |
| --------------- | ------------- | ------ |
| **1st (Right)** | $8^0$         | 1      |
| **2nd**         | $8^1$         | 8      |
| **3rd**         | $8^2$         | 64     |
| **4th**         | $8^3$         | 256    |

---

#### 🧠 Octal Decimal Conversion

**Example:** (octal) ko decimal mein convert karna.

**Calculation:**

$$1 \times 8^2 + 2 \times 8^1 + 5 \times 8^0$$
$$= 1 \times 64 + 2 \times 8 + 5 \times 1$$
$$= 64 + 16 + 5$$

---

#### 🚫 Octal in JavaScript (Important)

JavaScript mein octal likhne ke tarike change huye hain:

- **Old JavaScript (pre-ES6):**
  `012` // ❌ deprecated (Leading zero dangerous hota tha)
- **Modern JavaScript (ES6+):**
  `0o12` // ✅ correct octal literal (Prefix `0o` use karein)

###### ✅ Octal Literal Example (JS)

```javascript
let oct = 0o12;
console.log(oct); // Output: 10
```

📌 **Reason:**

---

#### 📥 parseInt() with Octal

String ko octal se decimal mein convert karne ke liye `radix` parameter use karein:

```javascript
parseInt('12', 8); // Output: 10
```

- **"12"** → number string
- **8** → radix (base-8)
- **Calculation:**

---

#### 📤 Decimal Octal Conversion

Decimal number ko octal string mein convert karne ke liye `.toString(8)` use karein:

```javascript
let num = 85;
console.log(num.toString(8)); // Output: "125"
```

📌 **`.toString(8)`** → number ko base-8 representation mein convert karta hai.

---

#### 🧑‍💻 Practical Usage

JavaScript coding mein ye rarely use hota hai, lekin **Linux / Unix systems** mein iska bahut bada role hai.

**Example (Linux File Permissions):**
`chmod 755 file.txt`

| Digit | Permission | Meaning              |
| ----- | ---------- | -------------------- |
| **7** | `rwx`      | Read, Write, Execute |
| **5** | `r-x`      | Read, Execute        |
| **5** | `r-x`      | Read, Execute        |

➡️ Ye permissions system poori tarah **octal system** par based hai.

---

#### 🔑 Quick Recall Points (Exam / Interview)

- **Octal** = Base-8
- **Digits** = 0–7
- **Place values** = Powers of 8 ()
- **JS octal prefix** = `0o`
- **parseInt(str, 8)** → Octal to Decimal
- **.toString(8)** → Decimal to Octal
- **Linux permissions** mein octal ka sabse zyada use hota hai.

---

#### 🧠 One-Line Memory Trick

> **Octal system = digits (0–7) multiplied by powers of 8.**
