## 🎯 Typed Arrays in JavaScript

Typed Arrays give us a way to work directly with binary data using special array-like structures. They are **optimized**, **fast**, and backed by `ArrayBuffer`.

### 🧱 What Are Typed Arrays?

- 📌 **VS DataView:** Unlike `DataView` (which gives full low-level byte control), Typed Arrays are specialized "views" over an `ArrayBuffer` for specific data types.
- 💡 **No Common Constructor:** Typed Arrays don't have a generic "TypedArray" constructor; they are each their own distinct type (e.g., `Int8Array`, `Uint32Array`).

---

### 🧪 List of Typed Arrays

| Category              | Types                                                        |
| --------------------- | ------------------------------------------------------------ |
| **Signed Integers**   | `Int8Array`, `Int16Array`, `Int32Array`, `BigInt64Array`     |
| **Unsigned Integers** | `Uint8Array`, `Uint16Array`, `Uint32Array`, `BigUint64Array` |
| **Clamped Integers**  | `Uint8ClampedArray` (Values clamp to 0-255 range)            |
| **Floating Point**    | `Float32Array`, `Float64Array`                               |

#### 🧮 Size Representation

- **8** ➜ Each element = **1 byte**
- **16** ➜ Each element = **2 bytes**
- **32** ➜ Each element = **4 bytes**

---

### 🛠️ Creating Typed Arrays

**1️⃣ Using an existing ArrayBuffer:**

```javascript
const aB = new ArrayBuffer(4);
const unsignedInt8Array = new Uint8Array(aB);
//or
const unsignedInt16Array = new Uint16Array(aB);
const unsignedInt32Array = new Uint32Array(aB);
```

**2️⃣ Create with size:** Another simple way to create a TypedArray➜ No need to create a Buffer first

```javascript
const u8 = new Uint8Array(4);
// Creates 4 empty slots (automatically 0-filled)
```

**3️⃣ Create with values:**

```javascript
const u8 = new Uint8Array([0xfe, 0x53, 0xde, 0x99]);
```

**4️⃣ Create and fill:**

```javascript
const u8 = new Uint8Array(4).fill(7);
// Result: [7, 7, 7, 7]
```

---

### ⚙️ TypedArray Features

- ✅ **Array-like Behavior:** Supports `.length`, `.map()`, `.forEach()`, and other standard array methods.
- ⚠️ **Fixed Size:** **No resizing** is allowed after creation.
- ✅ **Strict Typing:** Only supports numbers (integers or floats depending on the specific type).
- ✅ **Memory-safe:** Each array only stores its specific type (e.g., `Uint8Array` only stores 8-bit unsigned integers).

---

### 🧩UNDERSTANDING THE PROPERTIES OF ArrayBuffer()

**1. Resizable Buffers (`maxByteLength`)**
Used to define buffers that can grow.

```javascript
// Resizable buffer with a max size of 10 bytes
const buffer = new ArrayBuffer(4, { maxByteLength: 10 });
buffer.resize(8); //changed the buffer size to 8 bytes
```

**2. Detached Buffers (`transfer`)**
If a buffer is transferred, the original becomes "detached" (emptied/unusable).

```javascript
const a = new ArrayBuffer(4);
const b = a.transfer();

// `a` is now detached and empty
```

---

### 📌 Summary

- ✅ Use **DataView** for fine-grained control (endianness, mixed types).
- ✅ Use **TypedArray** for performance-friendly, uniform data operations.
- 📦 Both are views backed by the same raw **ArrayBuffer**.
