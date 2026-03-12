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
