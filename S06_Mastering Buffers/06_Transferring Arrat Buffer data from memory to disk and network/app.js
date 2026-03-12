import { writeFile } from 'node:fs/promises';

const buffer = new ArrayBuffer(5);
const uInt8Arr = new Uint8Array(buffer);
uInt8Arr[0] = 0x41;
uInt8Arr[1] = 0x61;
uInt8Arr[2] = 0x64;
uInt8Arr[3] = 0x69;
uInt8Arr[4] = 0x6c;
console.log(uInt8Arr);

// const decoder = new TextDecoder('utf-8');
// const decodedName = decoder.decode(uInt8Arr);
writeFile('./name.txt', uInt8Arr);
