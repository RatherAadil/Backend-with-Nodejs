## Introduction to Data Representation in Computing

#### 💡 What is Data Representation?

In computing, data representation refers to the way data is stored, processed, and transferred using **binary (0s and 1s)**.

Computers only understand electrical signals that translate into **ON (1)** or **OFF (0)** states. Everything you see on a screen is a result of these two states working together.

#### 🧱 Why Binary?

Computers use **transistors**, which are tiny switches that are either ON or OFF. Binary makes it easy to represent these states without errors:

- **ON** = 1
- **OFF** = 0

#### 🧮 Types of Data Representation

| Type        | Representation Format                                             |
| ----------- | ----------------------------------------------------------------- |
| **Numbers** | Binary (base-2), Octal (base-8), Decimal (base-10), Hex (base-16) |
| **Text**    | ASCII, Unicode (UTF-8, UTF-16)                                    |
| **Images**  | Bitmaps, JPEG, PNG, SVG (stored as 0s and 1s)                     |
| **Audio**   | Sampled sound waves stored as numbers                             |
| **Video**   | Combination of images + audio streams                             |

---

#### 🔢 Number Systems in Computing

| System          | Base | Uses                                     |
| --------------- | ---- | ---------------------------------------- |
| **Binary**      |      | Machine-level data                       |
| **Octal**       |      | Used in older systems                    |
| **Decimal**     |      | Human-readable numbers                   |
| **Hexadecimal** |      | Colors, memory addresses, compact binary |

---

#### ✍️ Text Representation

##### 1. ASCII (American Standard Code for Information Interchange)

- Represents characters as **7-bit** binary numbers.
- **Example:** 'A' = `01000001`

##### 2. Unicode (UTF-8, UTF-16)

- Supports characters from all languages and symbols (Emojis, special scripts).
- More flexible and the **standard** used globally today.

---

#### 🧊 Everything is Bits

No matter if it’s text, images, music, or video — all data inside a computer is ultimately stored and manipulated as **binary digits (bits)**.

---

### 🎯 Pro Tip

Understanding how data is compressed and represented is key for **System Design** and **Performance Optimization** in backend development.
