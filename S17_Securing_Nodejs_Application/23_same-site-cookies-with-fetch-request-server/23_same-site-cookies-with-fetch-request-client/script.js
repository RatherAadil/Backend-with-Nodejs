const form = document.querySelector('.login-form');
const nameField = document.querySelector('.name');
const emailField = document.querySelector('.email');
const userProfile = document.querySelector('.user-profile');

const serverUrl = 'https://api.local.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch(`${serverUrl}/login`, {
    method: 'POST',
    credentials: 'include',
  });
  fetchUser();
});

async function fetchUser() {
  const response = await fetch(`${serverUrl}/user`, {
    credentials: 'include',
  });

  if (response.status === 200) {
    const user = await response.json();
    nameField.textContent = user.name;
    emailField.textContent = user.email;
    userProfile.classList.remove('hidden');
    form.classList.add('hidden');
  } else {
    form.classList.remove('hidden');
    userProfile.classList.add('hidden');
  }
}

fetchUser();
