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
