const idToken = new URLSearchParams(location.hash.substring(1)).get('id_token');
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
    window.opener.postMessage({ message: 'success' });
    window.close();
  }
} else {
  window.opener.postMessage({ message: 'access_denied' });
  window.close();
}
