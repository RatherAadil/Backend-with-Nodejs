# 🔐 Authentication vs Authorization

Understanding the difference between **authentication** and **authorization** is crucial for designing secure systems. While they often go hand-in-hand, they serve **very different purposes**.

## ✅ Authentication

**Authentication** is the process of **verifying who a user is**.

> “Are you who you say you are?”

### 🔍 Example:

- Entering your **username and password** to log in.
- Logging in with **Google OAuth**.
- Using **biometrics** (like fingerprint or Face ID).

### 💡 Key Points:

- Happens **before** authorization.
- Establishes **identity**.
- Usually results in generating a **token** or session.

## 🔓 Authorization

**Authorization** is the process of **verifying what a user can access or do**.

> “What are you allowed to do?”

### 🔍 Example:

- A logged-in user can **view their profile**, but not others'.
- An admin can **delete** users, a normal user cannot.
- A student can **view course content**, but cannot **edit** it.

### 💡 Key Points:

- Happens **after** authentication.
- Deals with **permissions and access control**.
- Often implemented using **roles**.

## 🧠 Quick Comparison Table

| Feature       | Authentication              | Authorization         |
| ------------- | --------------------------- | --------------------- |
| Purpose       | Who you are                 | What you can do       |
| Happens when? | First                       | After authentication  |
| Determines    | Identity                    | Permissions           |
| Based on      | Credentials (password, OTP) | Roles, policies       |
| Result        | Session, token              | Access granted/denied |

## 🔗 Real-World Analogy

- **Authentication**: Showing your **ID card** at the building entrance.
- **Authorization**: Being allowed to enter **specific rooms** based on your role.

## 🚀 Summary

- ✅ **Authentication** checks **identity**.
- 🔓 **Authorization** checks **permissions**.
- You **must authenticate before you can be authorized**.
- Both are essential for securing applications.

---

# Stateful VS Stateless Auth

**Authentication** and **Authorization** mechanisms can be broadly classified into two categories:

## 🧠 Stateful

Stateful methods require the server to maintain user session information between requests.

### 🔐 Authentication (Stateful)

1. **Session-Based Authentication**

- After login, the server creates a session and stores it (usually in memory or database).
- A session ID is sent to the client as a cookie.
- Cookies can be Signed, HttpOnly, Secure, and have an expiration.
- The client sends this cookie on every request to authenticate.

### 🔓 Authorization (Stateful)

1. **Role-Based Access Control (RBAC)**
   - Roles like `admin`, `editor`, or `user` are stored on the server (e.g., in session or database).
   - Server checks role from the session data on every request.

2. **Access Control Lists (ACLs)**
   - Each user or role is associated with a list of permissions.
   - Checked server-side during each request.

## ☁️ Stateless

Stateless methods do not require the server to store any user session data. The client provides all necessary information with each request.

### 🔐 Authentication (Stateless)

1. **Token-Based Authentication (e.g., JWT)**
   - After login, the server generates a token (e.g., JSON Web Token) that encodes user identity and possibly permissions.
   - The browser (web) client stores the token (in httpOnly cookie or memory) and sends it automatically on every request.
   - The mobile (app) client stores the token (in secure storage) and sends in the `Authorization: Bearer <token>` header.
   - The server decodes and verifies the token on every request responds with the resources if the the token is valid.

### 🔓 Authorization (Stateless)

1. **Claims-Based Authorization (JWT)**
   - Claims in the token (like role, permissions) are used to authorize access to routes/resources.
   - No need to query the database or store roles in memory.

---

> 🧠 **Note**: In practice, many applications use a hybrid approach (e.g., JWT with refresh tokens and limited server-side session storage). Server to client (browser or mobile) auth you should not use JWT or stateless auth unless you don't care about security and session control.

---

# 🛡️ Introduction to Cryptography

Cryptography is the art and science of securing data by transforming it into a format that can only be understood by authorized parties. It ensures **confidentiality**, **integrity**, **authentication**, and **non-repudiation** of information.

## 🔐 Types of Cryptography

### 1. **Encryption (Reversible)**

Encryption is the process of converting data into an unreadable format to prevent unauthorized access. It can be reversed using a **key**.

#### Common Algorithms:

- AES (Advanced Encryption Standard)
- RSA (Rivest–Shamir–Adleman)
- DES (Data Encryption Standard)

#### ✍️ Terminology in Encryption/Decryption

| Term               | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| **Plaintext**      | The original readable message or data.                                    |
| **Ciphertext**     | The encrypted, unreadable version of the plaintext.                       |
| **Encryption**     | The process of converting plaintext into ciphertext using a key.          |
| **Decryption**     | The process of converting ciphertext back to plaintext using a key.       |
| **Key**            | A secret value used in encryption and decryption.                         |
| **Symmetric Key**  | The same key is used for both encryption and decryption.                  |
| **Asymmetric Key** | A key pair: public key (for encryption) and private key (for decryption). |

### 2. **Hashing (Irreversible)**

Hashing is the process of converting data into a fixed-size bits, which typically represents a digest of that data. It is **one-way**, meaning it cannot be reversed.

#### Common Algorithms:

- SHA-256 (Secure Hash Algorithm)
- MD5 (Message Digest Algorithm) (Obsolete)
- SHA-1 (Obsolete)

#### ✍️ Terminology in Hashing

| Term              | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| **Message**       | The original input data (e.g., a password, file, or string).           |
| **Hash / Digest** | The fixed-length output generated by the hashing algorithm.            |
| **Hash Function** | The algorithm that maps data of arbitrary size to a fixed-size output. |
| **Collision**     | When two different inputs produce the same hash (undesirable).         |
| **Salt**          | Random data added to input to prevent hash-based attacks.              |

## 🧠 Summary

- Use **encryption** when you want to recover the original data later.
- Use **hashing** when you only want to verify data integrity or store secrets like passwords.
- Always choose strong, modern algorithms and avoid outdated ones like MD5 or SHA-1.

Cryptography is a foundational part of modern cybersecurity and essential for protecting digital information.

---

# What is Hashing?

- A process that converts input data (like text or files) into a fixed-size output using a hash function.
- Output is usually shown as a hexadecimal string, but its size is in bytes.

Why is Hashing Used?

    ✅ Data Integrity – Check if data was modified.
    ✅ Version Control – Identify file or code changes.
    ✅ Digital Signatures – Ensure authenticity.
    ✅ Password Storage – Store passwords securely.
    ✅ Blockchain – Secure transactions and blocks.

Key Features of Secure Hash Functions

- **Deterministic** – Same input gives same output.
- **Fast** – Quickly computes the hash.
- **Irreversible** – Can’t get original data from hash.
- **Collision-resistant** – Two inputs don’t produce same hash.
- **Avalanche Effect** – Tiny input change → very different hash.

## Recommended Hash Algorithms

- **SHA-2 family** (SHA-224, SHA-256, SHA-384, SHA-512): Secure and widely used.
- **SHA-3 family**: More modern, alternative to SHA-2, based on Keccak algorithm.

## Insecure / Outdated Algorithms

- MD5: 128-bit hash, broken, should not be used.
- SHA-1: 160-bit, vulnerable, deprecated.

## Important Terms

- **Message:** The original input.
- **Hash/Digest**: Fixed-size output from hash function.
- **Hash Function**: The algorithm used (e.g., SHA-256).
- **Collision:** When two inputs produce the same hash.
- **Salt:** Random value added to input to strengthen the hash.

### Hashing ≠ Encryption

- Hashing is one-way, used for verification.
- Encryption is reversible, used for data protection.
- Encoding is different too — it’s just for data formatting.

---

# Hashing using Crypto Module

- Use: crypto.createHash(algorithm) to create a hash (e.g., 'sha256').
- Use .update(data) to add data for hashing.
- Accepted types: string, Buffer, TypedArray, DataView
- You can also chain multiple .update() calls to combine data.
- Use .digest(format) to get the final hashed output ('hex', 'base64', etc.).

* Once .digest() is called, the hash object can’t be reused.

* Example:

```js
const crypto = require('crypto');
const hash = crypto
  .createHash('sha256')
  .update('hello')
  .update('world')
  .digest('hex');
```

---

# How Git Uses Hashing — Summary

- Git uses the SHA-1 algorithm to uniquely identify content. But it doesn't hash raw file data directly — it uses a special format:

```js
   <type> <length>\0<content>
```

For files, the format is: `blob lengthOfData\0fileData`

## Why This Format?

    * Ensures uniqueness between object types (blob, tree, commit).
    * Adds integrity by including content length and type.
    * Prevents collisions across different objects.

## Git uses the same pattern for:

    * blob: file data
    * tree: directory structure
    * commit: commit metadata
    * tag: tag info

---

# Digital Signature (Asymmetric approach)

A digital signature ensures a document’s integrity, authenticity, and non-repudiation.

## The process:

    -> Hash the document using SHA-256 (or similar).
    -> Sign the hash using the sender's private key.
    -> Send the document + signature.

## The receiver:

    -> Hashes the received document.
    -> Decrypts the signature using the sender's public key.
    -> Compares the hashes.

If even 1 bit of the document changes, the hash will change completely and the signature will fail to verify.
