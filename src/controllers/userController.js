import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Allows sending cookies (for refresh tokens)
});

const userRegister = async (formData) => {
    try {
        const response = await api.post('/user/register', formData);
        console.log(response);
        return {response, status: response.status};
    } catch (error) {
        return {status, error}
    }
};
const userLogin = async (formData) => {
    try {
        const response = await api.post('/user/login', formData);
        console.log(response);
        return {response, status: response.status};
    } catch (error) {
        return {status, error}
    }
}
const refreshToken = async () => {
    try {
        const response = await api.get('/user/refresh-token',  { withCredentials: true });
        console.log(response);
        return {response, status: response.status};
    } catch (error) {
        return {status, error}
    }
}


export {
    userRegister,
    userLogin,
    refreshToken,
}