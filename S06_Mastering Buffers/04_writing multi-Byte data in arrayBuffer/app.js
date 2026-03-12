const a = new ArrayBuffer(4);
const view = new DataView(a);

//storing larger value in 1byte
view.setInt8(0, 257);
console.log(view.getInt8(0)); //1

//storing in 2bytes
view.setInt16(0, 257);
console.log(view.getInt16(0)); //257
