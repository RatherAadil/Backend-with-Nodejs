# Binary Data on Physical Level

Before learning **character encoding** (like ASCII, Unicode, UTF-8), we must first understand **how data is stored and transferred at the physical level**.

At the lowest level, **computers do not understand letters, images, audio, or video**.
They only understand **two states**, which we represent as:

- **0**
- **1**

These are called **binary digits** or **bits**.

---

## Can We See 0s and 1s Physically?

No, we **cannot directly see 0s and 1s** on hard disks, SSDs, pen drives, or memory.

In reality:

- **0s and 1s are not written as numbers**
- They are represented by **physical states**, such as:

  - Electrical charge
  - Magnetic direction
  - Voltage level
  - Light on/off

We _interpret_ these physical states as **0 and 1**.

---

## Two Categories of Data Representation

Data representation can be divided into **two main categories**:

1. **Data Storage**
2. **Data Transfer**

---

# 1. Data Storage (How Data Is Stored)

## A. SSD (Solid State Drive)

SSDs use **transistors** to store data.

### What is a Transistor?

- A transistor works like a **tiny switch**
- It can **store electrical charge**
- It has **two states**

### How SSD Stores 0 and 1

- **Charge present** → `1`
- **No charge** → `0`

These charges are:

- Stored using **electrons**
- Trapped inside **floating-gate transistors**

> Just like atoms can hold charges, these transistors trap electrons.

### Important Points

- SSDs have **millions to billions** of transistors
- Data is read by checking **whether charge exists or not**
- Faster than HDD because **no moving parts**

---

## B. HDD (Hard Disk Drive)

HDD uses **magnetism** instead of electrical charge.

### Structure of HDD

- A **rotating magnetic plate (platter)**
- A **read/write head**
- Surface coated with **magnetic material**

### How HDD Stores Data

Each tiny area on the disk has:

- **North magnetic polarity**
- **South magnetic polarity**

We represent:

- **North pole** → `1`
- **South pole** → `0`

### Old Technology Example

- **Cassette tapes** also used magnetic poles
- Same principle as HDD

---

## Bits and Bytes

- **Bit** → Smallest unit of data (`0` or `1`)
- **Byte** → 8 bits

Example:

```
10101010 = 1 byte
```

All data—text, images, audio, video—is made from **bits**.

---

# 2. Data Transfer (How Data Moves)

When data moves from one place to another, it uses **signals**, not stored charges.

---

## A. Electromagnetic Waves (Wireless Transfer)

Used in:

- 3G, 4G, 5G
- Bluetooth
- Wi-Fi
- Radio communication

### Key Concepts

- Electromagnetic waves include:

  - Radio waves
  - Visible light
  - Infrared, etc.

### Wave Properties

- **Amplitude** → Height of wave
- **Frequency** → How fast the wave oscillates

Data is encoded by:

- Changing amplitude
- Changing frequency
- Changing phase

---

## B. Fiber Optic Cable

Fiber optic cables transfer data using **light**.

### How It Works

- **Light ON** → `1`
- **Light OFF** → `0`

### Advantages

- Extremely fast
- Less signal loss
- Used in:

  - Internet backbone
  - Data centers
  - Cloud infrastructure

---

## C. Copper Cables (Ethernet, USB)

Copper cables do **not use light**.

They use:

- **High voltage** → `1`
- **Low voltage** → `0`

Used in:

- Ethernet cables
- USB cables
- Power lines with data

---

# Important Summary (Physical Level)

| Level        | Representation         |
| ------------ | ---------------------- |
| SSD          | Charge / No Charge     |
| HDD          | Magnetic North / South |
| Fiber        | Light ON / OFF         |
| Copper Cable | High / Low Voltage     |
| Wireless     | Wave modulation        |

---

## How OS Understands Data

- Physical hardware stores **charges or signals**
- Hardware converts them into **0s and 1s**
- Operating System reads those bits
- Software interprets bits as:

  - Numbers
  - Letters
  - Images
  - Audio
  - Video

---

## Question

**Q: If only 0s and 1s are stored, how do we save text, images, and videos?**

### Answer

Physically:

- Only **0s and 1s** are stored

Logically:

- Different **interpretation rules** are applied

Examples:

- Text → ASCII / Unicode
- Images → PNG, JPEG (pixels as numbers)
- Audio → MP3 (sound samples)
- Video → MP4 (frames + audio)

> Same binary data, **different meaning** based on interpretation.

---

# Why This Matters for a Node.js Developer

As a Node.js developer, this knowledge helps you understand:

### Buffers

```js
const buf = Buffer.from('Hello');
```

- Node.js handles **raw binary data**
- Buffers represent **bytes**

### Streams

- Data flows as **chunks of bytes**
- Over network, file system, or memory

### Encoding

```js
fs.readFile('file.txt', 'utf8');
```

- Encoding tells Node **how to interpret bits**

### Network Programming

- TCP/UDP send **binary packets**
- HTTP is built on top of binary transfer

---

# Final Key Takeaways

- Computers only store **0s and 1s**
- 0s and 1s are **physical states**
- Storage ≠ Transfer (different mechanisms)
- Meaning comes from **interpretation**
- Software sits **above physical binary data**
