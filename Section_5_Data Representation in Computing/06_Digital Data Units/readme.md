## 📦 Digital Data Units (with Clarification)

---

Just like we measure physical things (length in meters, weight in kilograms), digital data also has its own measurement units.

> **🧠 Philosophical Insight:**
> While we can't measure the smallest creation of nature (like a soul or consciousness), we can measure the smallest unit of data — something created by humans.

---

#### 🧮 Base Units

| Unit       | Value                        |
| ---------- | ---------------------------- |
| **1 Bit**  | Smallest unit of data ( or ) |
| **4 Bits** | 1 Nibble (Half Byte)         |
| **8 Bits** | 1 Byte                       |

---

#### 🌐 Two Systems of Measurement

Digital storage measure karne ke do alag tareeke hote hain. Manufacturers alag system use karte hain aur Operating Systems alag.

---

#### 1️⃣ SI (International System of Units)

- **Base:** **Powers of 10**
- Ye system hardware manufacturers (Samsung, SanDisk, HP) use karte hain. Isme size bada dikhta hai lekin technical data storage kam hota hai.

| Unit     | Meaning    | Bytes (LaTeX)                         |
| -------- | ---------- | ------------------------------------- |
| **1 KB** | 1 Kilobyte | $1,000$ Bytes ($10^3$)                |
| **1 MB** | 1 Megabyte | $1,000,000$ Bytes ($10^6$)            |
| **1 GB** | 1 Gigabyte | $1,000,000,000$ Bytes ($10^9$)        |
| **1 TB** | 1 Terabyte | $1,000,000,000,000$ Bytes ($10^{12}$) |

---

#### 2️⃣ IEC (International Electrotechnical Commission)

- **Base:** **Powers of 2**
- Ye system Operating Systems (Windows, macOS) aur programmers use karte hain. Actual usable data yahan dikhta hai.

| Unit      | Meaning    | Bytes (LaTeX)                        |
| --------- | ---------- | ------------------------------------ |
| **1 KiB** | 1 Kibibyte | $1,024$ Bytes ($2^{10}$)             |
| **1 MiB** | 1 Mebibyte | $1,048,576$ Bytes ($2^{20}$)         |
| **1 GiB** | 1 Gibibyte | $1,073,741,824$ Bytes ($2^{30}$)     |
| **1 TiB** | 1 Tebibyte | $1,099,511,627,776$ Bytes ($2^{40}$) |

#### 🧾 Real-World Example:

A **1TB** hard drive (manufacturer labeled in **SI**) appears as only **~931GB** on your computer (which reads in **IEC**).

**The missing space?**
Wo kahin gaya nahi hai. Manufacturers (Decimal) ke hisab se bechte hain, lekin Windows use (Binary) ke hisab se calculate karta hai. Is conversion gap ki wajah se humein "kam" storage dikhta hai.

---

### 🎯 Quick Summary

- **Manufacturers** use Base-10 (KB, MB, GB).
- **Computers** use Base-2 (KiB, MiB, GiB).
