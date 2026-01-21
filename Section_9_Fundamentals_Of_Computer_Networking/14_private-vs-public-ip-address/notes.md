## Private vs Public IP Address

## 🌍 Public IP Address

- Ye internet-facing address hota hai.
- Agar hamara IP public hai, tabhi hum internet se direct access ho sakte hain.
- Example: Agar hum site visit karein

      https://whatismyipaddress.com/

- To waha jo IP dikhega, wo hamare ISP ka public IP hoga.
- Agar hum chahte hain ki humare home router ka IP direct public ho, to ISP se extra charges dekar le sakte hain.

## 🏠 Private IP Address

- Ye local network ke liye hota hai (LAN ke andar ka address).
- Public internet se direct access nahi hota.

      Example: 192.168.x.x, 10.x.x.x

## 📜 Pehle ka System (Traditional NAT)

- Router ko direct public IP assign hoti thi (e.g., 145.4.2.8).
- Us router se multiple devices (📱 phone, 💻 laptop, tablet) connect hote.

* #### Router ek mapping table banata tha:

      →  MAC Address ↔ Private IP ↔ Public IP Port mapping
      →  Jab device internet request karta (e.g., Google open),
      →  Device → Router → Router apna public IP use karke request send karta.
      →  Google → Router ko response deta.
      →  Router mapping dekh ke correct device ko data forward karta.
      →  Isme NAT (Network Address Translation) use hota tha.

### Aajkal ISP ek extra CG-NAT(carrier grade network address translation) use karte hain.

- Hamara router ko private IP assign hota hai.
- Beech me ISP ka big router hota hai jiska public IP hota hai.

#### Flow:

        → Device (Private IP) → Home Router (Private IP)
        → Home Router → ISP Router (Public IP)
        → ISP Router → Internet (e.g., Google)
        → Response wapas same path se return hota hai.
