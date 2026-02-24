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
