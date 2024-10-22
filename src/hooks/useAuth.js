
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// // import { api } from '../utils/api';
// export const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true, // Allows sending cookies (for refresh tokens)
// });

// export const useAuth = () => {
//   const { authData, setAuthData } = useContext(AuthContext);

//   const register = async (formData) => {
//     try {
//       const response = await api.post("/auth/register", formData);
//       console.log(response);
//       const { data } = response;
//       setAuthData(data);
//       console.log(response);
//       return { response, status: response.status };
//     } catch (error) {
//       return { status, error };
//     }
//   };

//   const authLogin = async (formData) => {
//     try {
//       const response = await api.post("/auth/login", formData);
//       console.log(response);
//       const { data } = response;
//       setAuthData(data); // Save new access token and user data
//       console.log(data);
//       return { response, status: response.status };
//     } catch (error) {
//       return { status, error };
//     }
//   };

//   const logout = async () => {
//     await api.post("/auth/logout"); // Clears refresh token cookie
//     setAuthData(null); // Reset auth state
//   };
//   const refreshToken = async () => {
//     try {
//         const response = await api.get('/auth/refresh-token',  { withCredentials: true });
//         console.log(response);
//         return {response, status: response.status};
//     } catch (error) {
//         return {status, error}
//     }
// }

//   return { authData, authLogin, logout, register, refreshToken };
// };


import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { authData, login, refreshToken } = useContext(AuthContext);
  return { authData, login, refreshToken };
};
