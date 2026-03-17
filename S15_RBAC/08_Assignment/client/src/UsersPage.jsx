import { useState } from 'react';
import './UsersPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePermissions from './hooks/usePermission';
import useCanActOn from './hooks/useCanActOn';

const BASE_URL = 'http://localhost:4000';

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('Guest User');
  const [userRole, setUserRole] = useState('User');
  const [userEmail, setUserEmail] = useState('guest@example.com');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [error, setError] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  const { has } = usePermissions(userRole);
  const canActOn = useCanActOn(userRole);

  const roleOptions = {
    Manager: ['User', 'Manager'],
    Admin: ['User', 'Manager', 'Admin'],
    Owner: ['User', 'Manager', 'Admin', 'Owner'],
  };

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
  const logoutUser = async (user) => {
    const { id, email } = user;
    const confirmLogout = confirm(`You are about to logout: ${email}`);
    if (!confirmLogout) return;
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/logout`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User logged out successfully.');
        fetchAllUsers();
      } else if (response.status === 404) {
        console.log('No user sessions exits');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hardDeleteUser = async (user) => {
    const { id, email } = user;
    const confirmDelete = confirm(`You are about to delete: ${email}`);
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/hard`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User Deleted successfully.');
        fetchAllUsers();
      } else if (response.status === 404) {
        console.log('No user sessions exits');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const softDeleteUser = async (user) => {
    const { id, email } = user;
    const confirmDelete = confirm(`You are about to delete: ${email}`);
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/soft`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User Deleted successfully.');
        fetchAllUsers();
      } else if (response.status === 404) {
        console.log('No user sessions exits');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const restoreUser = async (user) => {
    const { id, email } = user;
    const confirmRestore = confirm(`You are about to restore: ${email}`);
    if (!confirmRestore) return;
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/restore`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User restored successfully.');
        fetchAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRole = async (id, role) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ newRole: role }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        fetchAllUsers();
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='users-container' onClick={() => setOpenMenuId(null)}>
      <h1 className='title'>All Users</h1>
      <div className='userRole'>
        <p>
          {userName} : {userRole} <br />
          Email : {userEmail}
        </p>
        <img src={userProfilePicture} alt='Profile' className='userRole-img' />
      </div>
      {error && <p className='error'>{error}</p>}
      <table className='user-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => {
            const isSelf = userEmail === user.email;
            const isActable = canActOn(user.role); // outranks target?

            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isLoggedIn ? 'Logged In' : 'Logged Out'}</td>
                <td>{user.role}</td>
                <td>
                  <div
                    className='choose-role'
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === user.id ? null : user.id);
                      setError(null);
                    }}
                  >
                    <div>Choose Role</div>

                    {openMenuId === user.id && (
                      <div className='user-menu'>
                        {roleOptions[userRole].map((opt) => (
                          <div
                            key={opt}
                            className='user-menu-item login-btn'
                            onClick={async () =>
                              await handleChangeRole(user.id, opt)
                            }
                          >
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {has('users:logout') && (
                    <button
                      className='logout-button'
                      onClick={() => logoutUser(user)}
                      disabled={!user.isLoggedIn || isSelf || !isActable}
                    >
                      Logout
                    </button>
                  )}

                  {has('users:delete.soft') && (
                    <button
                      className='logout-button delete-button'
                      onClick={() => softDeleteUser(user)}
                      disabled={user.isDeleted || isSelf || !isActable}
                    >
                      Delete
                    </button>
                  )}

                  {has('users:restore') && (
                    <button
                      className='restore-button'
                      onClick={() => restoreUser(user)}
                      disabled={!user.isDeleted || isSelf || !isActable}
                    >
                      Restore
                    </button>
                  )}

                  {has('users:delete.hard') && (
                    <button
                      className='logout-button delete-button'
                      onClick={() => hardDeleteUser(user)}
                      disabled={isSelf || !isActable}
                    >
                      Delete Permanently
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
