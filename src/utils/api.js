import axios from 'axios';

const loginApi = (formData) => {
  return axios.post('/api/auth/login', formData );
};

const registerApi = (formData) => {
  return axios.post('/api/auth/register', formData);
};

export { loginApi, registerApi };
