# What is Base64?

Base64 is a character encoding that converts binary data into string/text format so that it can be safely transmitted over text-based mediums like emails, URLs, or APIs.

- Key Facts:
- Purpose: Encode binary data (like files, images) as text.
- Uses 64 characters:
  a–z, A–Z, 0–9, +, /
- Each character represents 6 bits
- Base64 is a subset of ASCII

## In the Browser:

- We have 2 built-in functions:

1. `btoa()` 🔄 Binary ➡ ASCII (Base64)
2. `atob()` 🔄 ASCII (Base64) ➡ Binary

## Limitation:

These only work on strings, not raw binary data (like ArrayBuffer, Blob, etc.)

---

### Byte Behavior:

Base64 works in 3-byte chunks (3 × 8 = 24 bits ➡ 4 Base64 characters × 6 bits = 24 bits)
If the binary data is less than 3 bytes, padding is added using:

- = → for 1 missing byte

* == → for 2 missing bytes
* ➕ Extra 0s are filled in binary to complete the chunk.

##### 🧪 Example Flow:

- You provide a string "ABC"
- It's converted to binary using UTF-8
- Binary is broken into 6-bit chunks
- Each chunk is mapped to a Base64 character
- Final output: "QUJD"
