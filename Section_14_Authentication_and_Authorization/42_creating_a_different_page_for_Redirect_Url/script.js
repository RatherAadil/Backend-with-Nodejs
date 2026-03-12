const button = document.querySelector('button');

button.addEventListener('click', () => {
  window.open(authUrl, 'auth-popup', 'left=100,top=100,width=500,height=600');
});

window.addEventListener('message', ({ data }) => {
  if (data && data.code) {
    console.log(data.code);
  }
});
