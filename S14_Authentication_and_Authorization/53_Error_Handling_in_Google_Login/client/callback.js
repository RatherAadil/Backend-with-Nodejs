const sid = new URLSearchParams(location.search).get('sid');
if (sid) {
  const response = await fetch(
    `http://localhost:4000/session-cookie?sid=${sid}`,
    {
      credentials: 'include',
    },
  );
  if (response.status === 200) {
    window.opener.postMessage({ message: 'success' });
    window.close();
  }
} else {
  window.opener.postMessage({ message: 'access_denied' });
  window.close();
}
