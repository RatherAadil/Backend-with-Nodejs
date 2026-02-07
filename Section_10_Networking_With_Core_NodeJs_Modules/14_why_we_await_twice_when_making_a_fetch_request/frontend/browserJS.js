const response = await fetch('http://10.50.206.27:4000/');
console.log({ response });
// const data = await response.json();
// console.log(data);

for await (const chunk of response.body) {
  //   console.log(JSON.parse(decoder.decode(chunk)));
  //   console.log(chunk);
}
