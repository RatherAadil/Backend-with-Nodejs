const response = await fetch('http://10.50.206.27:4000/');
for await (const chunk of response.body) {
  console.log(chunk);
}
