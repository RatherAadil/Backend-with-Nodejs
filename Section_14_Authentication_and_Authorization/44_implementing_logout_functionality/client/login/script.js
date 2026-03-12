const button = document.querySelector('button');
const baseURL = 'http://localhost:4000';

const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const redirectUrl = 'http://localhost:5500/client/callback.html';
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener('click', () => {
  window.open(authUrl, 'auth-popup', 'width=500,height=600');
});

window.addEventListener('message', async ({ data }) => {
  if (!data?.code) return;
  const response = await fetch(`${baseURL}/auth/google/callback`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const responseData = await response.json();
  console.log(responseData);
  location.href = '../index.html';
});
