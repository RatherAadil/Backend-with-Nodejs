# Types of XSS Attack

Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into a webpage. There are 4 main types:

## Stored XSS (Persistent)

    -> Script is saved on the server (e.g., in a comment)
    -> Runs for every user who views it
    -> 🔥 High risk

## Self-XSS

    -> Attacker tricks user into pasting code in their browser console
    -> ⚠️ Medium risk

## Reflected XSS (Non-Persistent)

    -> Script comes from the URL or form and reflects in the response
    -> Runs immediately when the page loads
    -> ⚠️ Medium–High risk

## DOM-Based XSS

    -> Happens in client-side JavaScript (e.g., from innerHTML)
    -> No server involved
    -> ⚠️ Medium–High risk
