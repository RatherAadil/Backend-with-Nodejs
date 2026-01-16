//create a buffer of 4 bytes
const a = new ArrayBuffer(4);

//convert arrayBuffer into DataView
let view = new DataView(a);

//writing to Buffer  --->setInt8(index,value)
view.setInt8(0, 15);
view.setInt8(1, 0b111);
view.setInt8(2, 0o10);
view.setInt8(3, -1);
console.log(view);

// let view2 = new DataView(a, 2);
// console.log(view2);

//Reading from Buffer
const signedBufData = view.getInt8(3); //signed -1
const unsignedBufData = view.getUint8(3); //signed 255
console.log(signedBufData, unsignedBufData);
