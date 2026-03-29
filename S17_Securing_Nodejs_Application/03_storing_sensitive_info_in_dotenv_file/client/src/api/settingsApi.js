import { axiosWithCreds } from './axiosInstances';

export const fetchSettings = async () => {
  const { data } = await axiosWithCreds.get('/user/setting');
  return data;
};

export const changeUserPassword = async (newPassword, confirmPassword) => {
  const { data } = await axiosWithCreds.get('/user/changePassword', {
    newPassword,
    confirmPassword,
  });
  return data;
};

export const updateUserPassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
) => {
  const { data } = await axiosWithCreds.patch('/user/updatePassword', {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return data;
};

