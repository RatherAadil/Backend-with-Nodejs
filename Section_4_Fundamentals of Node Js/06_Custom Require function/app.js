const b = loadModule('./math.js');
const { sum } = loadModule('./sum.js');

console.log(sum(1, 2, 3, 4, 5));

function loadModule(path) {
  const fs = require('fs');
  const fileContent = fs.readFileSync(path).toString();
  return (function (send) {
    //module code goes here
    eval(fileContent);
    return send;
  })({});
}
