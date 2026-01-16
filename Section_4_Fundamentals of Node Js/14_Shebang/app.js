#!/usr/bin/env node
console.log('Hello World');
let num = 0;
setInterval(() => {
  console.log(++num);
}, 1000);
