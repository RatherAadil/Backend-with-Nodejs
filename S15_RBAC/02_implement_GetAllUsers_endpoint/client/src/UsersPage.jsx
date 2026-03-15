import { useState } from 'react';
import './UsersPage.css';
import { useEffect } from 'react';

const BASE_URL = 'http://localhost:4000';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setUsers(data);
    };
    fetchAllUsers();
  }, []);

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
      <table className='user-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th> {/* Logout button column */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
