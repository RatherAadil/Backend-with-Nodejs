## Understanding Socket

    A socket in networking is an endpoint for sending or receiving data. 
    In the case of UDP (User Datagram Protocol), sockets are used for connectionless communication.

### How UDP Sockets Work

    -> Server Side:
        Create a socket
        Bind it to an IP + port
        Wait for data

    -> Client Side:
        Create a socket
        send data to the server’s IP + port

#### UDP Socket = IP + Port

    A full UDP communication is defined by:
        Source IP:Port
        Destination IP:Port
    This is how devices know where to send and where the message came from.
