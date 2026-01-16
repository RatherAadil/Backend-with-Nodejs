fetch('http://localhost:3000/', {
  method: 'POST',
  body: 'Rather Aadil',
})
  .then((res) => res.text())
  .then((data) => console.log(data));
