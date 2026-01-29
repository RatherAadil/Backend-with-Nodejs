const response = await fetch('http://10.50.206.27:4000/');
console.log(response.headers);
response.headers.forEach((value, key) => {
  console.log(`${key} : ${value}`);
});
