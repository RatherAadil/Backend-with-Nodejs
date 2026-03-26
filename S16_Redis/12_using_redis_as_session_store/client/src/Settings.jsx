import { useEffect, useState } from 'react';
import './settings.css';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:4000';

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
    google: <FcGoogle />,
    github: <FaGithub />,
  };
  useEffect(() => {
    fetchSettings();
  }, []);
  async function fetchSettings() {
    try {
      const response = await fetch(`${BASE_URL}/user/setting`, {
        credentials: 'include',
      });

      if (!response.ok) {
        navigate('/login');
      }
      const resData = await response.json();
      const { success, data } = resData;
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
      console.error('Error fetching user info:', err);
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

    if (profile.isManualLogin) {
      updatePassword();
    } else {
      changePassword();
    }
  };
  const changePassword = async () => {
    const response = await fetch(`${BASE_URL}/user/changePassword`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        newPassword: password.password,
        confirmPassword: password.confirm,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage(data.message);
      fetchSettings();
    } else if (response.status === 401) {
      navigate('/login');
    }
  };
  const updatePassword = async () => {
    const response = await fetch(`${BASE_URL}/user/updatePassword`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        currentPassword: password.currentPassword,
        newPassword: password.password,
        confirmPassword: password.confirm,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage(data.message);
      fetchSettings();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } else if (!data.success) {
      setError(data.message);
    }
  };
  return (
    <div className='settings-container'>
      <section className='card'>
        <h3>Profile Picture</h3>

        <div className='profile-picture-row'>
          <img className='profile-avatar' src={profile.picture} alt='avatar' />

          <div>
            <button className='btn-primary'>Upload New Picture</button>
            <p className='muted'>JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>

        <label>Full Name</label>
        <input
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <label>Email Address</label>
        <input value={profile.email} disabled />

        <p className='muted'>Email cannot be changed once set.</p>

        <button className='btn-secondary'>Update Profile</button>
      </section>

      <section className='card'>
        <h3>Connected Account</h3>

        <div className='connected-box'>
          <div>
            <div className='connected-with'>
              {providerIcons[profile.socialProvider]}
              <strong className='connected-with'>
                {profile.socialProvider}
              </strong>
            </div>
            <p className='muted'>{profile.email}</p>
          </div>

          <span className='badge-success'>Connected</span>
        </div>

        <p className='muted small'>
          Only one social account can be connected at a time.
        </p>
      </section>

      {/* PASSWORD */}
      <section className='card'>
        <h3>
          {profile.isManualLogin
            ? 'Change Password'
            : 'Set Password for Manual Login'}
        </h3>

        <p className='muted'>
          Set a password to enable manual login in addition to your social
          login.
        </p>

        {profile.isManualLogin && (
          <>
            <label>Current Password</label>
            <div className='input-container'>
              <input
                type={viewCurrentPassword ? 'text' : 'password'}
                name='currentPassword'
                value={password.currentPassword}
                onChange={handleChange}
              />
              <button
                tabIndex={-1}
                type='button'
                className='showpassword-btn'
                onClick={() => setViewCurrentPassword((prev) => !prev)}
              >
                {viewCurrentPassword ? (
                  <FaEyeSlash color='grey' />
                ) : (
                  <FaEye color='grey' />
                )}
              </button>
            </div>
          </>
        )}
        <label>New Password</label>
        <div className='input-container'>
          <input
            type={viewPassword ? 'text' : 'password'}
            name='password'
            value={password.password}
            onChange={handleChange}
          />
          <button
            tabIndex={-1}
            type='button'
            className='showpassword-btn'
            onClick={() => setViewPassword((prev) => !prev)}
          >
            {viewPassword ? (
              <FaEyeSlash color='grey' />
            ) : (
              <FaEye color='grey' />
            )}
          </button>
        </div>
        <label>Confirm New Password</label>
        <div className='input-container'>
          <input
            type={viewConfirmPassword ? 'text' : 'password'}
            name='confirm'
            value={password.confirm}
            onChange={handleChange}
          />
          <button
            tabIndex={-1}
            type='button'
            className='showpassword-btn'
            onClick={() => setViewConfirmPassword((prev) => !prev)}
          >
            {viewConfirmPassword ? (
              <FaEyeSlash color='grey' />
            ) : (
              <FaEye color='grey' />
            )}
          </button>
        </div>

        {error && (
          <div className='error-container'>
            <p className='error-para'>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className='success-container'>
            <p className='success-para'>{successMessage}</p>
          </div>
        )}
        <button className='btn-primary' onClick={handleSubmit}>
          {profile.isManualLogin ? 'Change Password' : 'Set Password'}
        </button>
      </section>

      {/* LOGOUT OPTIONS */}
      <section className='card'>
        <h3>Logout Options</h3>

        <div className='logout-grid'>
          <div className='logout-card'>
            <h4>Current Device</h4>
            <p className='muted'>Logout from this device only</p>
            <button className='btn-warning'>Logout</button>
          </div>

          <div className='logout-card'>
            <h4>All Devices</h4>
            <p className='muted'>Logout from all devices</p>
            <button className='btn-danger'>Logout All</button>
          </div>
        </div>
      </section>

      {/* DISABLE ACCOUNT */}
      <section className='card warning-box'>
        <h3>Disable My Account</h3>

        <p>
          This action is temporary and can be reversed. Disabling your account
          will hide your profile and stop notifications.
        </p>

        <button className='btn-yellow'>Disable Account</button>
      </section>

      {/* DELETE ACCOUNT */}
      <section className='card danger-box'>
        <h3>Delete My Account</h3>

        <p>
          This action cannot be undone. Deleting your account will permanently
          remove all your data and files.
        </p>

        <button className='btn-danger'>Delete Account Permanently</button>
      </section>
    </div>
  );
}
