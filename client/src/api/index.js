import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUsers = () => API.get('/admin/getusers');
export const getUser = (id) => API.get(`/user/getuser/${id}`);
export const updateUserInfo = (id, formData) => API.patch(`/admin/updateuserinfo/${id}`, formData);
export const createUser = (formData) => API.post('/admin/createuser', formData);
export const updatePassword = (id, formData) => API.patch(`/admin/updatepassword/${id}`, formData);
export const deleteUser = (id) => API.delete(`/admin/deleteuser/${id}`);