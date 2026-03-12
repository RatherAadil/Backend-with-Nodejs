import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function UserRegistration() {
  const BASE_URL = 'http://localhost:4000';
  const [formData, setFormData] = useState({
    username: 'Rather Aadil',
    email: 'ratheraadil61@gmail.com',
    password: 'abcd',
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (form) => {
    const errorsData = {};

    if (!form.username.trim()) {
      errorsData.username = 'Enter username';
    }
    if (!form.email.trim()) {
      errorsData.email = 'Enter email';
    }
    if (!form.password.trim()) {
      errorsData.password = 'Enter password';
    }

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validate(formData);
    if (Object.keys(validationResult).length) return;

    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      setIsSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Name</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && (
            <span className='error-text'>{errors.username}</span>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='useremail'>Email</label>
          <input
            type='email'
            id='useremail'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className='error-text'>{errors.email}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <span className='error-text'>{errors.password}</span>
          )}
        </div>
        {error && <p className='error'>{error}</p>}
        <button
          type='submit'
          style={{ backgroundColor: isSuccess ? '#25d976' : '#4f46e5' }}
        >
          {isSuccess ? 'Registered Successfully' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
