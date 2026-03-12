import jwt from 'jsonwebtoken';
import { createHmac } from 'node:crypto';
const token = jwt.sign({ name: 'Aadil' }, 'secret', {
  algorithm: 'HS256',
  expiresIn: 10,
});

console.log(
  jwt.verify(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFkaWwiLCJpYXQiOjE3NzIyNjI4ODIsImV4cCI6MTc3MjI2Mjg5Mn0.SIcV2WSyVw2IV33lH29x64-mmUrETdEN68_lrVJ7m0E',
    'secret',
  ),
);
// console.log(token);

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFkaWwiLCJpYXQiOjE3NzIyNjE1Mjh9.cOAtalw1mkdY6F4-hVzr3D0l2SP-_aztqi1XhWAWg_o';

//RECREATING JWT TOKEN WITHOUT USING JWT BY USING ONLY JWT HEADER AND PAYLOAD
// console.log(
//   Buffer.from(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFkaWwiLCJpYXQiOjE3NzIyNjE1Mjh9',
//     'base64url',
//   ).toString(),
// );

//JWT INTERNALLY USES HMAC WITH SHA256 ALGO

// console.log(
//   createHmac('sha256', 'secret')
//     .update(
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFkaWwiLCJpYXQiOjE3NzIyNjE1Mjh9',
//     )
//     .digest('base64url'),
// );
