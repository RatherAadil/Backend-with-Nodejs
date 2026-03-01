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

---

# Cookie Auth Summary

On Login:

    -> Create payload → { id, expiry }
    -> Sign it using: sha256( payload + secretKey)
    -> Encode payload (base64url) → make: encodedPayload.signature
    -> Set cookie uid=encodedPayload.signature

On Each Request:

    -> Extract cookie → split into payload + signature
    -> Recreate hash → sha256(payload + secretKey)
    -> Compare hashes → reject if mismatch
    -> Check expiry
    -> Find user by ID → attach to req.user

---

# MAC/HMAC Vs Digital Signature

MAC (Message Authentication Code)

    -> A code to verify data integrity and authenticate the sender.
    -> Uses a secret key combined with the message.
    -> Both sender and receiver share the same secret key.
    -> Anyone with the key can create and verify the MAC.

HMAC (Hash-based Message Authentication Code)

    -> A type of MAC that uses a cryptographic hash function (e.g., SHA-256).
    -> More secure than just hashing the key and message directly.
    -> Protects against certain attacks like length-extension.

Digital Signature

    -> Uses asymmetric cryptography (private/public key pair).
    -> The sender signs a message with their private key.
    -> Anyone with the public key can verify the signature.
    -> Provides authenticity and non-repudiation (proof the sender signed).

Differences between MAC/HMAC and Digital Signature

    -> MAC/HMAC uses a shared secret key; digital signatures use a key pair.
    -> MACs can be generated and verified by anyone with the key; signatures can only be generated by the private key holder.
    -> Digital signatures allow public verification without revealing private keys.
    -> MACs are mainly for ensuring integrity and authentication between trusted parties; digital signatures provide stronger guarantees including non-repudiation.

---

# Cookie Signing with Cookie-Parser

- Use middleware, `cookieParser("secret")` to enable signing.

- Set a signed cookie:

```js
res.cookie('uid', 'value', { signed: true });
```

- Read signed cookie securely via:

```js
req.signedCookies.uid;
```

- If tampered, the cookie becomes undefined(false).

---

## 🌈 Rainbow Tables — Short Summary

- A **Rainbow Table** is a precomputed list of common passwords and their hash values (e.g., using SHA-256).
- A **Rainbow Table Attack** uses this table to quickly match a stolen password hash to its original plaintext password.
- It only works effectively if:
  - The hash algorithm is known.
  - **No salt** was used.

### Prevention

- Use a **unique salt** per password.
- Use slow password-hashing algorithms (KDFs) like bcrypt, Argon2, scrypt, or PBKDF2.
- Avoid fast hashes like MD5 or plain SHA-256 for storing passwords.

**Bottom line:** Salt + slow hashing = strong defense against rainbow table attacks.

## Rainbow Table (SHA-256)

| Plaintext | SHA-256 Hash                                                       |
| --------- | ------------------------------------------------------------------ |
| password  | `5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8` |
| 1234      | `03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4` |
| qwerty    | `65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5` |
| letmein   | `1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032` |
| admin     | `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918` |
| welcome   | `280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02` |
| ninja     | `54482595177116e6103b076dbf30648e5d0537dd1ed9cf5ae4562fa8a700d47b` |
| abc123    | `6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090` |
| iloveyou  | `e4ad93ca07acb8d908a3aa41e920ea4f4ef4f26e7f86cf8291c5db289780a5ae` |
| football  | `6382deaf1f5dc6e792b76db4a4a7bf2ba468884e000b25e7928e621e27fb23cb` |

## 🌐 Popular Websites to Crack Hashes

Here are three popular websites that can help crack hash values:

1. **[CrackStation](https://crackstation.net/)** — A powerful online hash cracker with a large lookup table (15GB+). Supports MD5, SHA1, SHA256. Easy to use and fast for common hashes.

2. **[Hashes.com](https://hashes.com/)** — A community-driven hash cracking service. You can upload hash lists, and it will try cracking using a massive collection of known hashes.

---

# Key Derivation Function (KDF)

    Purpose:
        -> Converts weak secrets (like passwords) into strong cryptographic keys.

    Why needed:
        -> Passwords are short and predictable — KDFs add salt, iterations, and complexity to resist attacks.

    How it works:
        -> Input (password) + Salt + Iterations → Secure Key

    Popular KDFs:
        -> PBKDF2 – HMAC-based, widely used
        -> bcrypt – Good for password hashing
        -> scrypt – Memory hard, protects against GPU attacks
        -> Argon2 – Modern, recommended for passwords
        -> HKDF – Used for key expansion (not passwords)

## Using PBKDF2 in Node.js (Example)

```js
const crypto = require('crypto');

const password = 'mysecret';
const salt = crypto.randomBytes(16);
const iterations = 100000;
const keylen = 32; // For AES-256
const digest = 'sha256';

crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
  if (err) throw err;
  console.log('Derived key:', derivedKey.toString('hex'));
});
```

---

# Bcrypt

### Two NPM Packages:

    bcrypt → C++ based (faster, use in Node.js backend).
    bcryptjs → Pure JavaScript (use in browser or where native modules are not available).

### When to Use What:

    Node.js (server-side): Prefer bcrypt for performance.
    Browser (client-side): Use bcryptjs since it runs without native bindings.

### Common bcrypt Methods

1. **bcrypt.genSalt(rounds)**
   - Generates a unique salt.
   - rounds defines the cost factor — higher means slower but more secure.
   - Example:

   ```js
   const salt = await bcrypt.genSalt(10);
   ```

2. **bcrypt.hash(password, saltOrRounds)**
   - Hashes the password with a salt.
   - You can pass:
     - a salt string: bcrypt.hash(password, salt)
     - or rounds directly: bcrypt.hash(password, 10) (auto-generates salt)
   - Example:

```js
const hashed = await bcrypt.hash('mypassword', salt);
```

3. **bcrypt.compare(plain, hashed)**
   - Compares a plain password with its hashed version.
   - Returns true if matched.
   - Example:

```js
const isMatch = await bcrypt.compare('mypassword', hashed);
```

---

# What is JWT?

JWT Works in server–server architectures and not recomended for client–server.
uses hmac based sha256.

JWT is a secure, compact token used for authentication and authorization, containing 3 parts:

1. **Header:** Token type & algorithm.
2. **Payload:** Data (e.g., user ID, role).
3. **Signature:** Verifies data integrity.

Common JWT Methods

    ➤ jwt.sign(payload, secret, options)
        Creates a token.
        Example:
            jwt.sign({ userId: 1 }, 'secret', { expiresIn: '1h' });

    ➤ jwt.verify(token, secret)
        Verifies and decodes token.
        Example:
            jwt.verify(token, 'secret');

    ➤ jwt.decode(token)
        Decodes token without verifying.
        Example:
            jwt.decode(token);

---

# Why You Should Not Use JWTs for Login Sessions

JSON Web Tokens (JWTs) are often marketed as a modern solution for authentication. While they are useful in some contexts (like stateless service-to-service communication), **they are not ideal for client-server login authentication** — especially when used in place of traditional session management.

## 🚫 Core Problems with JWT-Based Login Sessions

### 1. **Inability to Revoke Tokens Easily**

JWTs are **stateless** and **self-contained**, meaning:

- Once a token is issued, you **cannot invalidate it** unless you maintain a separate revocation list.
- This defeats the whole point of statelessness.

### 2. **Token Theft = Full Access**

If a JWT is stolen (via XSS, network leak, etc.):

- It gives the attacker **full access until it expires**
- No way to destroy it unless it expires or you manually track it in a DB/Redis (which reintroduces state)

### 3. **No Rotation or One-Time Use**

- JWTs do not have a built-in rotation system.
- Refresh tokens can mitigate this, but that’s extra complexity and doesn't solve the root problem of statelessness.

### 4. **Token Bloat**

- JWTs often contain embedded user data.
- These large tokens are sent **on every request**, bloating headers and impacting performance.

### 5. **Not Built for User Sessions**

JWTs were designed to **convey claims between parties**, not to **manage authentication sessions**.

- They are ideal for **federated identity** (e.g., OAuth/OpenID Connect)
- Not for managing a user’s "logged-in state" on your app

## ✅ When Should You Use JWTs?

Use JWTs when:

- You need **stateless** authentication across microservices
- You're building **federated identity systems** (e.g., Google/Facebook login)

## ✅ Better Alternative: Server-Side Sessions

Use traditional **session IDs** stored in cookies:

- Easily invalidated (just destroy the session in DB)
- No sensitive user data stored on client
- Less risk of misuse
- Works beautifully with `HttpOnly` and `Secure` flags on cookies

## 🔗 References & Further Reading

1. 📘 [Don't Use JWTs for Sessions — Ian London](https://ianlondon.github.io/posts/dont-use-jwts-for-sessions/)
2. 🔧 [Redis: JWTs Are Not Safe](https://redis.io/resources/json-web-tokens-jwts-are-not-safe/)
3. 🧠 [GitHub Gist — JWTs as Session Tokens](https://gist.github.com/samsch/0d1f3d3b4745d778f78b230cf6061452)
4. 🎥 [YouTube — Why You Shouldn’t Use JWTs for Sessions (Ben Awad)](https://www.youtube.com/watch?v=pYeekwv3vC4)

## ⚖️ Summary

| Use Case                          | Should You Use JWT? |
| --------------------------------- | ------------------- |
| Login/auth sessions               | ❌ No               |
| Stateless service-to-service auth | ✅ Yes              |
| OAuth/OpenID identity tokens      | ✅ Yes              |
| Client-side session management    | ❌ No               |

## 🧠 Final Thought

JWTs are a powerful tool — but **only when used in the right context**.  
For login sessions, traditional **cookie-based sessions with server-side storage** remain **more secure, simpler to manage, and easier to revoke.**

---

# What is a Session?

- A session is a way for a server to remember a user across multiple requests.
- It works by giving the client a unique ID, which helps the server recognize the user.
- There are two types of sessions based on how and where data is stored.

### Stateless Sessions (e.g., JWT):

    * All data is stored on the client.
    * Server is stateless.
    * ✅ Scalable
    * ❌ Cannot revoke easily, must protect the token

### Stateful Sessions (e.g., Session ID + server storage):

    * Data stored on the server (RAM, file, or database).
    * Client only holds a session ID.
    * Types:
        * In-memory: Fast, but lost on restart.
        * File-based: Persistent but slow.
        * Database-backed: Scalable and persistent (used in production).

---

# Server-Side Session Types: DevOps Perspective

In the context of DevOps and server architecture, server-side sessions can be categorized into two major types based on how tightly they are coupled with the server instance:

## Server-Coupled Sessions (Stateful)

These sessions store data on the same server handling the user.

#### In-Memory Session

- Data is saved in the server’s RAM.
- Very fast but lost if the server restarts.
- Not usable with multiple servers (not scalable).
- Good only for small apps or testing.

#### File-Based Session

- Data is saved in files on the server.
- More lasting than memory, but slower.
- Still tied to one machine.
- Not good for big or scalable apps.

## Server-Decoupled Sessions (Stateless)

These sessions store data in a shared database, not the server.

#### Database-Backed Session

- Data is saved in Redis, MongoDB, or SQL.
- All servers can access the same session data.
- Works well with many servers.
- Good for large, scalable apps.
