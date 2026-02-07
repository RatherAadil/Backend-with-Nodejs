const aB = new ArrayBuffer(52428800); //50mb
const view = new DataView(aB);

for (let i = 0; i < view.byteLength; i++) {
  view.setInt8(i, i + 1);
}

console.log(view);
