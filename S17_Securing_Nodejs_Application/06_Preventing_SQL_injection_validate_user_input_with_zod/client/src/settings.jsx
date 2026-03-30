import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  fetchSettings,
  changeUserPassword,
  updateUserPassword,
} from './api/settingsApi';
import { logoutAllSessions, logoutUser } from './api/userApi';

// ✅ Defined OUTSIDE Settings so it's never recreated on re-render
const PasswordField = ({ label, name, value, show, onToggle, onChange }) => {
  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-150';

  return (
    <div className='mb-4'>
      <label className='block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5'>
        {label}
      </label>
      <div className='relative'>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputBase} pr-10`}
        />
        <button
          tabIndex={-1}
          type='button'
          onClick={onToggle}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
        >
          {show ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
        </button>
      </div>
    </div>
  );
};

export default function Settings() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    picture: '',
    isManualLogin: null,
    isSocialLogin: null,
    socialProvider: false,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [viewCurrentPassword, setViewCurrentPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const providerIcons = {
    google: <FcGoogle size={20} />,
    github: <FaGithub size={20} />,
  };

  useEffect(() => {
    getSettings();
  }, []);

  async function getSettings() {
    try {
      const { data } = await fetchSettings();
      const {
        name,
        email,
        picture,
        isManualLogin,
        isSocialLogin,
        socialProvider,
      } = data;
      setProfile({
        name,
        email,
        picture,
        isManualLogin,
        isSocialLogin,
        socialProvider: socialProvider ?? null,
      });
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else console.error('Error fetching user info:', err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validate = (passwordData) => {
    const { currentPassword, password, confirm } = passwordData;
    if (!password || !confirm) {
      setError('Please fill all the fields');
      return false;
    }
    if (password.length < 6 || confirm.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (currentPassword && currentPassword.length < 6) {
      setError('Current password must be at least 6 characters');
      return false;
    }
    if (password !== confirm) {
      setError('Passwords did not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    const isValid = validate(password);
    if (!isValid) return;
    if (profile.isManualLogin) updatePassword();
    else changePassword();
  };

  const changePassword = async () => {
    try {
      const data = await changeUserPassword(
        password.password,
        password.confirm,
      );
      setSuccessMessage(data.message);
      getSettings();
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else console.error('Change password error:', err);
    }
  };

  const updatePassword = async () => {
    try {
      const data = await updateUserPassword(
        password.currentPassword,
        password.password,
        password.confirm,
      );
      setSuccessMessage(data.message);
      getSettings();
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutAllSessions();
      navigate('/login');
    } catch (err) {
      console.error('Logout all error:', err);
    }
  };
  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-150';

  return (
    <div className='min-h-screen bg-slate-50 px-6 py-10'>
      <div className='max-w-2xl mx-auto'>
        {/* ── Page header ── */}
        <div className='mb-8'>
          <p className='text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1'>
            Account
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
            Settings
          </h1>
        </div>

        <div className='flex flex-col gap-6'>
          {/* ── Profile ── */}
          <section className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            <div className='h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400' />
            <div className='p-6'>
              <h3 className='text-base font-bold text-slate-800 mb-5'>
                Profile
              </h3>

              <div className='flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100'>
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt='avatar'
                    className='w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100'
                  />
                ) : (
                  <div className='w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white'>
                    {profile.name?.[0] ?? '?'}
                  </div>
                )}
                <div>
                  <button className='text-xs font-semibold px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-200 transition-colors duration-150'>
                    Upload New Picture
                  </button>
                  <p className='text-xs text-slate-400 mt-1.5'>
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className='mb-4'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5'>
                  Full Name
                </label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className={inputBase}
                />
              </div>

              <button className='text-xs font-semibold px-4 py-2 rounded-full bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 shadow-sm transition-colors duration-150'>
                Update Profile
              </button>
            </div>
          </section>

          {/* ── Connected Account ── */}
          {profile.isSocialLogin && (
            <section className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
              <div className='h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400' />
              <div className='p-6'>
                <h3 className='text-base font-bold text-slate-800 mb-5'>
                  Connected Account
                </h3>
                <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm'>
                      {providerIcons[profile.socialProvider]}
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-slate-700 capitalize'>
                        {profile.socialProvider}
                      </p>
                      <p className='text-xs text-slate-400'>{profile.email}</p>
                    </div>
                  </div>
                  <span className='text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-sm shadow-emerald-200'>
                    Connected
                  </span>
                </div>
                <p className='text-xs text-slate-400 mt-3'>
                  Only one social account can be connected at a time.
                </p>
              </div>
            </section>
          )}

          {/* ── Password ── */}
          <section className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            <div className='h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400' />
            <div className='p-6'>
              <h3 className='text-base font-bold text-slate-800 mb-1'>
                {profile.isManualLogin
                  ? 'Change Password'
                  : 'Set Password for Manual Login'}
              </h3>
              <p className='text-xs text-slate-400 mb-5'>
                Set a password to enable manual login in addition to your social
                login.
              </p>

              {profile.isManualLogin && (
                <PasswordField
                  label='Current Password'
                  name='currentPassword'
                  value={password.currentPassword}
                  show={viewCurrentPassword}
                  onToggle={() => setViewCurrentPassword((p) => !p)}
                  onChange={handleChange}
                />
              )}
              <PasswordField
                label='New Password'
                name='password'
                value={password.password}
                show={viewPassword}
                onToggle={() => setViewPassword((p) => !p)}
                onChange={handleChange}
              />
              <PasswordField
                label='Confirm New Password'
                name='confirm'
                value={password.confirm}
                show={viewConfirmPassword}
                onToggle={() => setViewConfirmPassword((p) => !p)}
                onChange={handleChange}
              />

              {error && (
                <div className='mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl'>
                  <span>⚠</span> {error}
                </div>
              )}
              {successMessage && (
                <div className='mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl'>
                  <span>✓</span> {successMessage}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className='text-xs font-semibold px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-200 transition-colors duration-150'
              >
                {profile.isManualLogin ? 'Change Password' : 'Set Password'}
              </button>
            </div>
          </section>

          {/* ── Logout Options ── */}
          <section className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            <div className='h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400' />
            <div className='p-6'>
              <h3 className='text-base font-bold text-slate-800 mb-5'>
                Logout Options
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-slate-50 rounded-xl border border-slate-100'>
                  <h4 className='text-sm font-bold text-slate-700 mb-1'>
                    Current Device
                  </h4>
                  <p className='text-xs text-slate-400 mb-4'>
                    Logout from this device only
                  </p>
                  <button
                    onClick={handleLogout}
                    className='text-xs font-semibold px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm shadow-blue-200 transition-colors duration-150'
                  >
                    Logout
                  </button>
                </div>
                <div className='p-4 bg-slate-50 rounded-xl border border-slate-100'>
                  <h4 className='text-sm font-bold text-slate-700 mb-1'>
                    All Devices
                  </h4>
                  <p className='text-xs text-slate-400 mb-4'>
                    Logout from all devices
                  </p>
                  <button
                    onClick={handleLogoutAll}
                    className='text-xs font-semibold px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-200 transition-colors duration-150'
                  >
                    Logout All
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Disable Account ── */}
          <section className='bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden'>
            <div className='h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400' />
            <div className='p-6'>
              <h3 className='text-base font-bold text-amber-700 mb-2'>
                Disable My Account
              </h3>
              <p className='text-sm text-slate-500 mb-5'>
                This action is temporary and can be reversed. Disabling your
                account will hide your profile and stop notifications.
              </p>
              <button className='text-xs font-semibold px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-sm shadow-amber-200 transition-colors duration-150'>
                Disable Account
              </button>
            </div>
          </section>

          {/* ── Delete Account ── */}
          <section className='bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden'>
            <div className='h-1 w-full bg-gradient-to-r from-red-500 to-rose-500' />
            <div className='p-6'>
              <h3 className='text-base font-bold text-red-700 mb-2'>
                Delete My Account
              </h3>
              <p className='text-sm text-slate-500 mb-5'>
                This action cannot be undone. Deleting your account will
                permanently remove all your data and files.
              </p>
              <button className='text-xs font-semibold px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-200 transition-colors duration-150'>
                Delete Account Permanently
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
