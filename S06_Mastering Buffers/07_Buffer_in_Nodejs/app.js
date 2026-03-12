import { Buffer } from 'buffer';

const nodeBuffer = Buffer.alloc(4);
nodeBuffer[0] = 97;
nodeBuffer[1] = 98;
nodeBuffer[2] = 99;
console.log(nodeBuffer);

// const a = new ArrayBuffer(4);
// const nodeBuffer = Buffer.from(a);
// const uint8Array = new Uint8Array(a);

// uint8Array[0] = 97;
// uint8Array[1] = 98;
// uint8Array[2] = 99;

// console.log(uint8Array.toString());
// console.log(nodeBuffer.toString());
