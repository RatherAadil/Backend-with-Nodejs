import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const BASE_URL = 'http://localhost:4000';

  const [formData, setFormData] = useState({
    email: 'ratheraadil61@gmail.com',
    password: 'aadil',
  });

  const [serverError, setServerError] = useState('');

  // OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setOtpError('');
      setCountdown(0);
    }

    if (serverError) setServerError('');

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // SEND OTP
  const handleSendOtp = async () => {
    const { email } = formData;

    if (!email) {
      setOtpError('Please enter email first');
      return;
    }

    try {
      setIsSending(true);

      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(60);
        setOtpError('');
      } else {
        setOtpError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      setOtpError('Something went wrong');
    } finally {
      setIsSending(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    const { email } = formData;

    if (!otp) {
      setOtpError('Enter OTP');
      return;
    }

    try {
      setIsVerifying(true);

      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setOtpError('OTP verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setOtpError('Verify OTP before login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ ...formData, otp }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setServerError('Something went wrong.');
    }
  };

  const hasError = Boolean(serverError);

  return (
    <div className='container'>
      <h2 className='heading'>Login</h2>

      <form className='form' onSubmit={handleSubmit}>
        {/* EMAIL + SEND OTP */}
        <div className='form-group'>
          <label className='label'>Email</label>

          <div className='otp-wrapper'>
            <input
              className={`input ${hasError ? 'input-error' : ''}`}
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email'
              required
            />

            <button
              type='button'
              className='otp-button'
              onClick={handleSendOtp}
              disabled={isSending || countdown > 0}
            >
              {isSending
                ? 'Sending...'
                : countdown > 0
                  ? `${countdown}s`
                  : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* OTP FIELD */}
        {otpSent && (
          <div className='form-group'>
            <label className='label'>Enter OTP</label>

            <div className='otp-wrapper'>
              <input
                className='input'
                type='text'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                placeholder='4-digit OTP'
              />

              <button
                type='button'
                className='otp-button'
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpVerified}
              >
                {isVerifying
                  ? 'Verifying...'
                  : otpVerified
                    ? 'Verified'
                    : 'Verify OTP'}
              </button>
            </div>

            {otpError && <span className='error-msg'>{otpError}</span>}
          </div>
        )}

        {/* PASSWORD */}
        <div className='form-group'>
          <label className='label'>Password</label>

          <input
            className={`input ${hasError ? 'input-error' : ''}`}
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            required
          />

          {serverError && <span className='error-msg'>{serverError}</span>}
        </div>

        <button type='submit' className='submit-button' disabled={!otpVerified}>
          Login
        </button>
      </form>

      <p className='link-text'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
