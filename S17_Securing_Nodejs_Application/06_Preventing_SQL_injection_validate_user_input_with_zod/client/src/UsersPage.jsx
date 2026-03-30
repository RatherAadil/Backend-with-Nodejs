import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePermissions from './hooks/usePermission.js';
import useCanActOn from './hooks/useCanActOn.js';
import {
  fetchAllUsers,
  fetchUser,
  logoutUserById,
  softDeleteUserById,
  hardDeleteUserById,
  restoreUserById,
  changeUserRole,
} from './api/userApi';

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
    fetchCurrentUser();
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      if (err.response?.status === 403) navigate('/');
      else if (err.response?.status === 401) navigate('/login');
      else console.error('Fetching users failed:', err);
    }
  }

  async function fetchCurrentUser() {
    try {
      const data = await fetchUser();
      setUserName(data.name);
      setUserEmail(data.email);
      setUserRole(data.role);
      setUserProfilePicture(data.picture);
    } catch (err) {
      if (err.response?.status === 401) {
        setUserName('Guest User');
        setUserEmail('guest@example.com');
      } else {
        console.error('Fetching current user failed:', err);
      }
    }
  }

  const logoutUser = async (user) => {
    if (!confirm(`You are about to logout: ${user.email}`)) return;
    try {
      await logoutUserById(user.id);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 404) console.log('No user sessions exist');
      else console.error('Logout error:', err);
    }
  };

  const softDeleteUser = async (user) => {
    if (!confirm(`You are about to delete: ${user.email}`)) return;
    try {
      await softDeleteUserById(user.id);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 404) console.log('No user sessions exist');
      else console.error('Soft delete error:', err);
    }
  };

  const hardDeleteUser = async (user) => {
    if (!confirm(`You are about to permanently delete: ${user.email}`)) return;
    try {
      await hardDeleteUserById(user.id);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 404) console.log('No user sessions exist');
      else console.error('Hard delete error:', err);
    }
  };

  const restoreUser = async (user) => {
    if (!confirm(`You are about to restore: ${user.email}`)) return;
    try {
      await restoreUserById(user.id);
      fetchUsers();
    } catch (err) {
      console.error('Restore error:', err);
    }
  };

  const handleChangeRole = async (id, role) => {
    try {
      await changeUserRole(id, role);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change role');
    }
  };

  const roleBadgeColor = {
    Owner: 'bg-violet-600 text-white',
    Admin: 'bg-indigo-600 text-white',
    Manager: 'bg-blue-500 text-white',
    User: 'bg-slate-400 text-white',
  };

  return (
    <div
      className='min-h-screen bg-slate-50 px-6 py-10'
      onClick={() => setOpenMenuId(null)}
    >
      <div className='max-w-6xl mx-auto'>
        {/* ── Header ── */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <p className='text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1'>
              Admin Panel
            </p>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
              User Management
            </h1>
          </div>

          {/* Current user chip */}
          <div className='flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm'>
            {userProfilePicture ? (
              <img
                src={userProfilePicture}
                alt='Profile'
                className='w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100'
              />
            ) : (
              <div className='w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white'>
                {userName[0]}
              </div>
            )}
            <div>
              <p className='text-sm font-semibold text-slate-800 leading-none'>
                {userName}
              </p>
              <p className='text-xs text-slate-400 mt-0.5'>{userEmail}</p>
            </div>
            <span
              className={`ml-1 text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadgeColor[userRole] ?? roleBadgeColor.User}`}
            >
              {userRole}
            </span>
          </div>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className='mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl'>
            <span>⚠</span>
            {error}
            <button
              onClick={() => setError(null)}
              className='ml-auto hover:text-red-800 transition-colors'
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Table card ── */}
        <div className='rounded-2xl border border-slate-200  shadow-sm bg-white'>
          {/* Table header accent bar */}
          <div className='h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400' />

          <table className='w-full text-sm'>
            <thead>
              <tr>
                {[
                  'Name',
                  'Email',
                  'Status',
                  'Role',
                  'Change Role',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className='px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400'
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {users.map((user) => {
                const isSelf = userEmail === user.email;
                const isActable = canActOn(user.role);

                return (
                  <tr
                    key={user.id}
                    className={`transition-colors duration-150 hover:bg-indigo-50/40 ${
                      user.isDeleted ? 'opacity-70' : ''
                    }`}
                  >
                    {/* Name */}
                    <td className='px-5 py-4 font-semibold text-slate-800 whitespace-nowrap'>
                      {user.name}
                      {isSelf && (
                        <span className='ml-2 text-[10px] font-bold tracking-widest uppercase bg-indigo-100 text-indigo-500 px-1.5 py-0.5 rounded-full'>
                          you
                        </span>
                      )}
                    </td>

                    {/* Email */}
                    <td className='px-5 py-4 text-slate-400 font-mono text-xs'>
                      {user.email}
                    </td>

                    {/* Status */}
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                          user.isLoggedIn
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-300 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${user.isLoggedIn ? 'bg-white' : 'bg-slate-500'}`}
                        />
                        {user.isLoggedIn ? 'Online' : 'Offline'}
                      </span>
                    </td>

                    {/* Role */}
                    <td className='px-5 py-4'>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${roleBadgeColor[user.role] ?? roleBadgeColor.User}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Change Role dropdown */}
                    <td className='px-5 py-4'>
                      <div
                        className='relative inline-block'
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === user.id ? null : user.id,
                          );
                          setError(null);
                        }}
                      >
                        <button className='flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-150 cursor-pointer select-none shadow-sm shadow-indigo-200'>
                          Set Role
                          <span className='opacity-75'>▾</span>
                        </button>

                        {openMenuId === user.id && user.role !== userRole && (
                          <div className='absolute left-0 z-20 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden'>
                            {roleOptions[userRole]?.map((opt) => (
                              <div
                                key={opt}
                                className='px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors duration-100'
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await handleChangeRole(user.id, opt);
                                  setOpenMenuId(null);
                                }}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className='px-5 py-4'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        {has('users:logout') && (
                          <button
                            onClick={() => logoutUser(user)}
                            disabled={!user.isLoggedIn || isSelf || !isActable}
                            className='text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-150
                              bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm shadow-blue-200
                              disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed'
                          >
                            Logout
                          </button>
                        )}

                        {has('users:delete.soft') && (
                          <button
                            onClick={() => softDeleteUser(user)}
                            disabled={user.isDeleted || isSelf || !isActable}
                            className='text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-150
                              bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-200
                              disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed'
                          >
                            Delete
                          </button>
                        )}

                        {has('users:restore') && (
                          <button
                            onClick={() => restoreUser(user)}
                            disabled={!user.isDeleted || isSelf || !isActable}
                            className='text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-150
                              bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-sm shadow-emerald-200
                              disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed'
                          >
                            Restore
                          </button>
                        )}

                        {has('users:delete.hard') && (
                          <button
                            onClick={() => hardDeleteUser(user)}
                            disabled={isSelf || !isActable}
                            className='text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-150
                              bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm shadow-rose-200
                              disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed'
                          >
                            Perm. Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty state */}
          {users.length === 0 && (
            <div className='py-20 text-center text-slate-400 text-sm'>
              No users found.
            </div>
          )}
        </div>

        {/* Footer count */}
        <p className='mt-4 text-xs text-slate-400 text-right'>
          {users.length} user{users.length !== 1 ? 's' : ''} total
        </p>
      </div>
    </div>
  );
}
