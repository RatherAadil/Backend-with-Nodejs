const BASE_URL = 'http://localhost:4000';

export const loginWIthGoogle = async (idToken) => {
  if (idToken) {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });
    const data = await response.json();
    return data;
  }
};
