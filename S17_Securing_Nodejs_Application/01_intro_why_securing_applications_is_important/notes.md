# Why Web Security Is Important

- Web apps often handle private data like passwords, emails, and money details. If the app is not secure, hackers can steal data, cause damage, and break user trust.

- Why You Should Care About Security

```
    -> Keep user data safe
    -> Stop hackers from breaking in
    -> Keep your website running smoothly
    -> Follow rules and laws (like GDPR)
    -> Protect your brand’s reputation
```

## Common Dangers to Web Apps:

    -> SQL Injection – Hacker tricks the database using bad input.
       Fix: Use safe database queries.

    -> XSS (Cross-Site Scripting) – Bad scripts are run in the browser.
       Fix: Clean user input.

    -> CSRF – User is tricked into doing something without knowing.
       Fix: Use CSRF tokens.

    -> Weak Login Systems – Easy-to-guess passwords or session hacks.
       Fix: Use strong logins and 2FA.

    -> IDOR – Accessing other people’s data by changing URLs.
       Fix: Check user access for every request.

    -> Sensitive Data Leaks – Data is not encrypted or logged by mistake.
       Fix: Use HTTPS and encryption.

    -> Bad Settings – Default passwords, open ports, etc.
       Fix: Configure servers properly and update them.

    -> DoS/DDoS Attacks – Overloading the server so it crashes.
       Fix: Use rate limits and traffic filters.

    -> Old Libraries – Using code with known bugs.
       Fix: Update dependencies often.

    -> No Monitoring – Attacks go unnoticed.
       Fix: Add logs and alerts.
