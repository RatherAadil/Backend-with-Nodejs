const code = new URLSearchParams(location.search).get('code');
const clientId =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUrl = 'http://localhost:5500';

if (code) {
  fetchIdToken();
}

async function fetchIdToken() {
  console.log('Running fetchIdToken function...');
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log('Error occurred');
    console.log(data);
    return;
  }

  const userToken = data.id_token.split('.')[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
}
