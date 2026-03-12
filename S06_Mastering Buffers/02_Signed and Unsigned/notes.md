# Signed vs Unsigned Binary Numbers

## 📌 Basics

- Computers represent numbers in binary.
- But binary alone doesn't indicate whether a number is positive or negative.
- That's where **Signed** and **Unsigned** concepts come in.

### 🔢 Unsigned Binary

- Can store **only non-negative** values.
- The entire bit space is used to represent magnitude.

**✅ 8-bit Unsigned Range:** `0` to `255` ($2^8 = 256$ possible values)

### 🔁 Signed Binary (2's Complement)

- Used to represent **both positive and negative** numbers.
- The **Most Significant Bit (MSB)** is reserved as the sign bit:
  - `0` → Positive number
  - `1` → Negative number

**✅ 8-bit Signed Range:** `-128` to `+127`  
(Still 256 values, but split between negative and positive)

### ✍️ How is a Negative Number Stored?

If the MSB is `1`, it is assumed to be negative, and the system uses **2’s complement** to get the actual value.

### 🧮 2’s Complement (Method to Get Negative Value)

To find the 2's complement of a binary number:

1.  **Flip all bits** (i.e., `0` → `1`, `1` → `0`)
2.  **Add 1** to the result

**Example:**

```text
Positive:   00000101  →  5

Flip:       11111010
Add 1:      11111011  → -5 (2's complement representation)
```

So `11111011` is how **-5** is stored in an 8-bit signed buffer.

---

### ⚠️ Important Note

For **0 to 127**, signed and unsigned binary are the same, because the MSB is `0`.

But from **128 to 255**, they differ:

- **In unsigned:** It's just `128`–`255`
- **In signed:** It's actually `-128` to `-1` (interpreted using 2’s complement)
