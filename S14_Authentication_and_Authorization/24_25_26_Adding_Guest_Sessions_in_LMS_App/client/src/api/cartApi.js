import axiosInstance from './axiosInstance';

export const getCartItemsApi = async () => {
  const { data } = await axiosInstance.get('/cart');
  return data;
};

export const addToCartApi = async (courseId) => {
  const { data } = await axiosInstance.post('/cart', { courseId });
  return data;
};
export const removeFromCartApi = async (courseId) => {
  const { data } = await axiosInstance.delete(`/cart/${courseId}`);
  return data;
};
