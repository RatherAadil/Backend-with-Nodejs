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
