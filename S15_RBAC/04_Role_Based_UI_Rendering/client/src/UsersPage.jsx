import { useState } from 'react';
import './UsersPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:4000';

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('Guest User');
  const [userRole, setUserRole] = useState('User');
  const [userEmail, setUserEmail] = useState('guest@example.com');
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    fetchUser();
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else if (response.status === 403) {
      navigate('/');
    } else if (response.status === 401) {
      navigate('/login');
    }
  };
  async function fetchUser() {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
        setUserEmail(data.email);
        setUserRole(data.role);
        setUserProfilePicture(data.picture);
        setLoggedIn(true);
      } else if (response.status === 401) {
        setUserName('Guest User');
        setUserEmail('guest@example.com');
      } else {
        console.error('Error fetching user info:', response.status);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  }
  const logoutUser = (userId) => {
    alert(`Logging out user with ID: ${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isLoggedIn: false } : user,
      ),
    );
  };

  return (
    <div className='users-container'>
      <h1 className='title'>All Users</h1>
      <div className='userRole'>
        <p>
          {userName} : {userRole} <br />
          Email : {userEmail}
        </p>
        <img src={userProfilePicture} alt='Profile' className='userRole-img' />
      </div>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
            {userRole === 'Admin' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isLoggedIn ? 'Logged In' : 'Logged Out'}</td>
              <td>
                <button
                  className='logout-button'
                  onClick={() => logoutUser(user.id)}
                  disabled={!user.isLoggedIn}
                >
                  Logout
                </button>
              </td>
              {userRole === 'Admin' && (
                <td>
                  <button
                    className='logout-button delete-button'
                    onClick={() => logoutUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
