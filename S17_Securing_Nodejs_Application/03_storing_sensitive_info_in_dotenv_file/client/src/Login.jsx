import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, sendOtp, verifyOtp } from './api/authApi';
import { FaGithub } from 'react-icons/fa';
import { loginUser } from './api/userApi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'procodrr@gmail.com',
    password: 'abcd',
  });
  const [serverError, setServerError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) setServerError('');
    if (name === 'email') {
      setServerError('');
      setOtpError('');
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) return setOtpError('Please enter your email first.');
    try {
      setIsSending(true);
      await sendOtp(formData.email);
      setOtpSent(true);
      setCountdown(60);
      setOtpError('');
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setOtpError('Please enter OTP.');
    try {
      setIsVerifying(true);
      await verifyOtp(formData.email, otp);
      setOtpVerified(true);
      setOtpError('');
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Invalid or expired OTP.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setOtpError('Please verify your email with OTP.');
    try {
      const data = await loginUser({ ...formData, otp });
      if (data.error) setServerError(data.error);
      else navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setServerError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  const hasError = Boolean(serverError);

  return (
    <div className='max-w-md mx-auto p-5'>
      <h2 className='text-center text-2xl font-semibold mb-3'>Login</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='relative mb-3'>
          <label className='block mb-1 font-bold'>Email</label>
          <div className='relative'>
            <input
              type='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 pr-24 border ${serverError ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            <button
              type='button'
              onClick={handleSendOtp}
              disabled={isSending || countdown > 0}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 text-xs rounded'
            >
              {isSending
                ? 'Sending...'
                : countdown > 0
                  ? `${countdown}s`
                  : 'Send OTP'}
            </button>
          </div>
          {serverError && (
            <span className='absolute text-xs text-red-500 mt-1'>
              {serverError}
            </span>
          )}
        </div>

        {otpSent && (
          <div className='relative mb-3'>
            <label className='block mb-1 font-bold'>Enter OTP</label>
            <div className='relative'>
              <input
                type='text'
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full p-2 pr-24 border border-gray-300 rounded'
              />
              <button
                type='button'
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpVerified}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 text-xs rounded'
              >
                {isVerifying
                  ? 'Verifying...'
                  : otpVerified
                    ? 'Verified'
                    : 'Verify OTP'}
              </button>
            </div>
            {otpError && (
              <span className='absolute text-xs text-red-500 mt-1'>
                {otpError}
              </span>
            )}
          </div>
        )}
        <div className='relative mb-3'>
          <label htmlFor='password' className='block mb-1 font-bold'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {serverError && (
            <span className='absolute top-full left-0 text-red-500 text-xs mt-1'>
              {serverError}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 rounded w-full font-medium hover:opacity-90'
        >
          Login
        </button>
      </form>

      <p className='text-center mt-3'>
        Don't have an account?{' '}
        <Link className='text-blue-600 hover:underline' to='/register'>
          Register
        </Link>
      </p>

      <div className='relative text-center my-3'>
        <div className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-gray-300'></div>
        <span className='relative bg-white px-2 text-sm text-gray-600'>Or</span>
      </div>

      <div className='flex items-center gap-2'>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const result = await loginWithGoogle(credentialResponse.credential);
            if (result && !result.error) {
              navigate('/');
            } else {
              setServerError(result.error || 'Google login failed.');
            }
          }}
          onError={() => {
            setServerError('Something went wrong. Please try again.');
            console.log('Login Failed');
          }}
          shape='pill'
          text='Continue with Google'
          useOneTap
        />
        <button
          type='button'
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/github`)
          }
          className='border shrink-0 overflow-hidden border-zinc-300 rounded-full flex items-center justify-between p-2 gap-2 cursor-pointer'
        >
          <FaGithub size={17} />
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
