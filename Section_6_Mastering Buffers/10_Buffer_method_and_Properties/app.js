import { Buffer } from 'buffer';
// const nodeBuffer = new Buffer.from('Hello world');
// console.log(nodeBuffer);
// console.log(nodeBuffer.toString());

const buffer2 = new Buffer.alloc(16);

//=== METHODS ====

//Write in a buffer using write()
buffer2.write('hello world');

//Convert buffer into a string
// console.log(buffer2.toString());

//toJSON()
// console.log(buffer2.toJSON());

//slice
// console.log(buffer2.slice(1, 6).toString());
// or subarray()
// console.log(buffer2.subarray(1, 5).toString());

//copy
const buff2 = new Buffer.alloc(5);
buffer2.copy(buff2, 0, 0, 5);
// console.log(buff2.toString());

//==== PROPERTIES =====
console.log(buffer2.buffer);
console.log(buffer2.byteLength);
console.log(buffer2.byteOffset);
console.log(buffer2.length);
