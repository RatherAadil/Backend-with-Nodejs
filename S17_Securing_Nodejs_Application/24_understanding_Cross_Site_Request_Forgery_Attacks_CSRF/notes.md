# CSRF Attack (Cross-Site Request Forgery)

## What it is?

    -> CSRF is when a hacker tricks your browser into sending a request you didn’t intend.
    -> Since your browser has your cookies, the malicious request looks legit to the server.

## How it works (Step by Step)

    -> You log in to your bank (or any site) → Browser stores a session cookie.
    -> You visit a malicious site (attacker’s blog, ad, or email link).
    -> That site secretly makes a request to your bank like:
        <img src="https://mybank.com/transfer?to=attacker&amount=1000" />
    -> Browser automatically attaches your bank’s cookies.
    -> Bank receives the request → sees valid cookie → assumes it’s you → money transferred.

## Why it works?

    -> Browsers auto-attach cookies to requests (same-site and cross-site).
    -> The bank doesn’t know if the request came from you or a hacker’s site.

## Real-World Examples

    -> Money transfer without permission 💰
    -> Changing your email/password on a site 🔑
    -> Submitting a malicious form on your behalf

## How to Prevent CSRF

    -> SameSite Cookies → restrict cookie sending in cross-site requests.
    -> CSRF Tokens → server generates a random token per session/request; form submissions must include it.
    -> Double Submit Cookie → send CSRF token in both cookie + request body and compare.
    -> Check Referer/Origin Header → validate the request came from the right site.
    -> Use Secure + HttpOnly Cookies.
