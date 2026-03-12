const button = document.querySelector('button');

const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'http://localhost:5500/client/callback.html';

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&nonce=123&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUri}`;

button.addEventListener('click', () => {
  window.open(authUrl, 'auth-popup', 'width=500,height=600');
});

window.addEventListener('message', async ({ data }) => {
  if (data.message === 'success') {
    location.href = '/client/index.html';
  } else if (data.message === 'access_denied') {
    const para = document.createElement('p');
    para.innerText = 'Something went wrong!';
    document.body.appendChild(para);

    setTimeout(() => {
      para.remove();
    }, 2000);
  }
});
