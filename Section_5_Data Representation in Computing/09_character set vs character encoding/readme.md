## ✳️ Character Set vs Character Encoding

#### 📘 Character Set

A **Character Set** is a collection of characters and the codes assigned to represent them. It defines **which** characters exist—letters, digits, symbols, control characters, and emojis.

**✅ Popular Character Sets:**

- **ASCII (American Standard Code for Information Interchange):**
- Supports **128 characters**.
- Uses **7 bits** to represent characters -> $2^7 = 128$.
- Includes: `A–Z`, `a–z`, `0–9`, punctuation, and control characters.

- **Unicode:**
- A much larger set capable of representing over **1.1 million characters**.
- Supports characters from all major languages, emojis, and mathematical symbols.

---

#### 🧠 Character Encoding

**Character Encoding** defines **how** characters from the set are represented as binary data (s and s). It is the actual implementation that translates characters into bytes for storage and transmission.

**🧾 Examples:**

- **ASCII Encoding:**
- Uses **7 bits** per character.
- Can only encode characters found in the ASCII character set.

- **UTF-8 (Unicode Transformation Format - 8 bit):**
- **Variable-length encoding:** Uses to bytes.
- **Backward-compatible:** The first characters are the same as ASCII.
- **Web Standard:** Most popular Unicode encoding today (used in HTML, databases, and APIs).

---

#### ⚖️ Summary Table

| Feature        | Character Set                        | Character Encoding                           |
| -------------- | ------------------------------------ | -------------------------------------------- |
| **Definition** | A "Library" of available characters. | The "Rules" to convert characters to binary. |
| **Key Goal**   | To identify characters.              | To store/transmit characters efficiently.    |
| **Examples**   | ASCII, Unicode                       | UTF-8, UTF-16, ASCII                         |

---

### 🎯 Developer Tip

Modern software development mein hamesha **UTF-8** use karne ki advice di jaati hai kyunki ye **universal** hai aur ASCII ke saath perfectly compatible hai.
