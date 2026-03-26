import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './settingPage.css';
import { useEffect } from 'react';

const BASE_URL = 'http://localhost:4000';

export const SettingsPage = () => {
  const [visibleInput, setVisibleInput] = useState(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${BASE_URL}/user/setting`, {
          credentials: 'include',
        });
        if (!response.ok) {
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    }
    fetchUser();
  }, []);

  const toggleVisibility = (field) => {
    setVisibleInput((prev) => (prev === field ? null : field));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };
  const handleSubmit = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Password did not match');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (password.length === 0 || confirmPassword.length === 0) {
      setError('Please fill all the fields');
      return;
    } else if (password.length < 6 || confirmPassword.length < 6) {
      setError('Enter a 6 digit password');
      return;
    }
    changePassword();
  };
  const changePassword = async () => {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setServerMessage(data.message);
    } else if (response.status === 403) {
      navigate('/');
    } else if (response.status === 401) {
      navigate('/login');
    }
  };
  return (
    <div className='settings-container'>
      <h2>Change Your Password</h2>

      <form className='settings-form'>
        <div className='input-container'>
          <label htmlFor='password'>Choose Password</label>
          <div className='password-input'>
            <input
              name='password'
              value={formData.password}
              onChange={handleChange}
              type={visibleInput === 'password' ? 'text' : 'password'}
              id='password'
              placeholder='choose a strong password'
            />
            <span onClick={() => toggleVisibility('password')}>
              {visibleInput === 'password' ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className='input-container'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <div className='password-input'>
            <input
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              type={visibleInput === 'confirmPassword' ? 'text' : 'password'}
              id='confirm-password'
              placeholder='confirm password'
            />
            <span onClick={() => toggleVisibility('confirmPassword')}>
              {visibleInput === 'confirmPassword' ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {error && <p className='settings-error'>{error}</p>}

        <button
          type='button'
          className='settings-button'
          onClick={handleSubmit}
        >
          Change Password
        </button>
        {serverMessage && <p className='message'>{serverMessage}</p>}
      </form>
    </div>
  );
};
