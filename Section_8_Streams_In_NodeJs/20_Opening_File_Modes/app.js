import fs from 'fs';

// const fd = fs.openSync('file.txt', 'r');
// const fd = fs.openSync('file.txt', 'w');
const fd = fs.openSync('file.txt', 'a');
fs.writeSync(fd, 'Hiii');
