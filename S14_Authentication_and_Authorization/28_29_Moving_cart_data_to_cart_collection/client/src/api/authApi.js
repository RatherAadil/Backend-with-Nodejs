import axiosInstance from './axiosInstance';

export const registerApi = async (userData) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData);
    return data;
  } catch (error) {
    // Throw clean error message
    throw new Error(error?.data?.message || 'Registration failed');
  }
};
export const loginApi = async (userData) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);
    return data;
  } catch (error) {
    // Throw clean error message
    throw new Error(error?.data?.message || 'Login failed');
  }
};
export const logoutApi = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};
export const getUserprofileApi = async () => {
  const { data } = await axiosInstance.get('/auth/profile');
  return data;
};
