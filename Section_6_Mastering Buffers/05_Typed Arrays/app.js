const aB = new ArrayBuffer(4);

//create a Typed Array
const unsignedInt8Array = new Uint8Array(aB);
const unsignedInt16Array = new Uint16Array(aB);
const unsignedInt32Array = new Uint32Array(aB);

// console.log(unsignedInt8Array);
// console.log(unsignedInt16Array);
// console.log(unsignedInt32Array);

//write and Read -->same as arrays
unsignedInt8Array[0] = 0xfe;
// console.log(unsignedInt8Array[0]);

//Another simple way to create a TypedArray--> No need to create a Buffer first
const abc = new Uint8Array(4);
// console.log(abc.buffer);

//Shortcut

const xyz = new Uint8Array([0xfe, 0xff, 0, 0xac]);
// console.log(xyz, xyz.buffer);

//==== UNDERSTANDING THE PROPERTIES OF ArrayBuffer()====
const a = new ArrayBuffer(4, { maxByteLength: 16 }); //can get max 16 Bytes
a.resize(8); //changed the buffer size to 8 bytes.
// console.log(a);

const uA = new Uint8Array(a);
//detach
uA[0] = 0xfe;
uA[1] = 0xee;
uA[2] = 0xbb;
uA[3] = 0xaa;

const b = a.transfer();
console.log('B: ', b);

console.log('A: ', a);
