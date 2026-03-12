const fs = require('fs');
const text = fs.readFileSync('./text.txt');
console.log(text.toString());
console.log(text);
