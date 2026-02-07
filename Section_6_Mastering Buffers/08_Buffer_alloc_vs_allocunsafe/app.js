import { Buffer } from 'buffer';
const buffer1 = Buffer.alloc(4);
const buffer2 = Buffer.allocUnsafe(11000);
console.log(buffer1.toString());
console.log(buffer2.toString());
