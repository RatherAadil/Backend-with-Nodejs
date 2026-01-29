## Transfering File using file (Not Recommended)

    UDP is fast but not reliable — no guarantee of delivery, order, or error checking.

    Sending full files using UDP is not recommended because:
        Packet size is limited (~65KB max)
        No built-in retransmission or acknowledgment

    Instead, split the file into chunks and send via stream (manually handle order & loss).

    TCP is better for file transfer (handles reliability automatically).
    UDP is used only for special cases like TFTP or real-time needs.
