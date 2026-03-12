const button = document.querySelector('button');
const baseURL = 'http://localhost:4000';

const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const redirectUrl = 'http://localhost:4000/auth/google/callback';
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener('click', () => {
  window.open(authUrl, 'auth-popup', 'width=500,height=600');
});

window.addEventListener('message', async ({ data }) => {
  if (data.message === 'success') location.href = '../index.html';
});
