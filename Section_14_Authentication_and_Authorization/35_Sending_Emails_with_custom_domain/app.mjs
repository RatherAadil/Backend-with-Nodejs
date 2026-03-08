import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: 'your email',
    pass: 'uqkz ldag euvz svuo',
  },
});

// Send an email using async/await

const info = await transporter.sendMail({
  from: '"Rather Aadil" <youremail',
  to: 'reciever@gmail.com',
  subject: 'Hello ✔',
  // text: 'Hello world?',
  html: '<b>Hello world?</b>',
});

console.log('Message sent:', info.messageId);
