const fs = require('fs');
fs.writeFileSync('./text.txt', 'this is your content');
const text = fs.readFileSync('./text.txt');
fs.renameSync('text.txt', 'newText.txt');
console.log(text.toString());
console.log(text);
