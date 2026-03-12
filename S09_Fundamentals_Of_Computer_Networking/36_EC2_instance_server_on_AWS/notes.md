## Understanding EC2

- EC2 (Elastic Compute Cloud) is a web service that provides resizable compute capacity (i.e., virtual machines) in the cloud.
- It’s like renting a computer in the cloud that you can log into and run your code on.

### Steps to Create an EC2 Instance

1.  **Login to AWS Console**

        Go to: https://aws.amazon.com
        Sign in to the AWS Management Console.

2.  **Choose the Right Region**

        In the top right corner, choose the region closest to your target users.
        This ensures lower latency and better performance.

3.  **Launch an EC2 Instance**

        Navigate to EC2 from the AWS services menu.
        Click on “Launch instance”.
        Fill in the form:

            Name: Give your instance a name (e.g., MyServer).
            Application and OS Image (AMI): Choose Amazon Linux 2 AMI (free tier eligible).
            Instance type: Select t2.micro (1 vCPU, 1 GB RAM – free tier eligible).
            Key pair (login):

                Create a new key pair if you don’t have one.
                Type: RSA.
                Format: .pem (for Linux/macOS) or .ppk (for Windows with PuTTY).
                Download the private key file and store it safely.

            Network settings:

                Enable SSH (port 22) to access the instance.
                Allow HTTP (port 80) if you are serving a website.

            Storage: Default 8 GB is fine.

        Click Launch Instance.

### Assign an Elastic IP

- **Why?**

        An EC2 instance's public IP changes after every stop/start.
        An Elastic IP is a static IP address from AWS that stays the same.

* **Steps:**

        Go to EC2 Dashboard → Elastic IPs.
        Click Allocate Elastic IP address.
        Click Allocate.
        Now, select the new IP and click Actions → Associate Elastic IP address.
        Choose:
            Instance: Select your running EC2 instance.
            Leave private IP default.
        Click Associate.

  Now your EC2 instance has a static public IP.

### Clean Up: Disassociate & Terminate

Disassociate Elastic IP

    Go to Elastic IPs in EC2 dashboard.
    Select your Elastic IP.
    Click Actions → Disassociate Elastic IP address.

Terminate the EC2 Instance

    Go to Instances.
    Select your instance.
    Click Instance state → Terminate instance.
    Confirm termination.

Release the Elastic IP (optional to avoid charges)

    Go to Elastic IPs.
    Select your IP.
    Click Actions → Release Elastic IP address.
