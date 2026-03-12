const googleLogin = document.getElementById('google-login');

const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';

async function handleCredentialResponse(response) {
  const idToken = response.credential;
  if (idToken) {
    const response = await fetch(`http://localhost:4000/auth/google`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    if (response.status === 200) {
      location.href = '/client/index.html';
    }
  } else {
    console.log('Something went wrong!');
  }
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });
  google.accounts.id.prompt();
  google.accounts.id.renderButton(googleLogin, {
    text: 'continue_with',
    shape: 'pill',
    logo_alignment: 'left',
  });
};
