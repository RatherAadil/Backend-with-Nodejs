// const environmentVariables = process.env;
// console.log(environmentVariables);

//set env using node js:Basically what we are doing, we are using powershell to set the env variable.
// const { exec } = require('child_process');
// exec(`'powershell -Command "setx VARIABLE_NAME 'AADIL' /M"`);

// setInterval(() => {
//   console.log('Environment variable');
// }, 1000);

const fs = require('fs');
const fileData = fs.readFileSync('./.env').toString();
fileData.split(/\r?\n/).forEach((variable) => {
  const [key, value] = variable.split('=');
  process.env[key] = value;
});
setInterval(() => {
  const a = process.env;
  console.log('Hiii');
}, 1000);

//PROMO CODE FOR REGEX COURSE: NODEREGEX
