import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [authData, setAuthData] = useState(() => {
    // Get auth data from local storage on initial load
    const savedAuthData = localStorage.getItem("authData");
    return savedAuthData ? JSON.parse(savedAuthData) : null;
});


  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Allows sending cookies (for refresh tokens)
  });

  const authLogin = async (formData) => {
    try {
        const response = await api.post("/auth/login", formData);
        console.log("authLogin", response);
        const { data } = response;
        setAuthData(data);
        const accessToken = response.data.accessToken;
        const authDetails = {"accessToken": accessToken, "users": response.data.user}
        localStorage.setItem("authData", JSON.stringify(authDetails)); // Save to local storage
        return { response, status: response.status };
    } catch (error) {
        return { error, status: error.response?.status || 500 };
    }
};

  console.log("rrVerify login", loading, authData);
  const refreshToken = async () => {
    if (!authData?.refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await api.get('/auth/refresh-token', {
            headers: {
                'Authorization': `Bearer ${authData.refreshToken}`
            },
            withCredentials: true,
        });

        const { data } = response;

        if (data && data.accessToken) {
            setAuthData((prev) => {
                const updatedAuthData = { ...prev, accessToken: data.accessToken };
                localStorage.setItem("authData", JSON.stringify(updatedAuthData)); // Save updated token
                return updatedAuthData;
            });
        }

        return { response, status: response.status };
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
    }
};

  
  

  useEffect(() => {
    console.log('Refreshing')
    const verifyLogin = async () => {
      try {
        const { response } = await refreshToken(); 
        console.log("refresh token", response);
        setAuthData(response.data); 
      } catch (error) {
        console.log("Login verification failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (authData) {
      verifyLogin();
    } else {
      setLoading(false);
    }
  }, [authData]);

  useEffect(() => {
    // console.log("Verify login", loading, authData);
    // public routes that don't require authentication
    const publicRoutes = ["/login", "/register", "/about"]; 
  
    if (!loading) {
      if (authData) {
        // If authenticated, redirect to profile or any private page
        if (location.pathname === "/login" || location.pathname === "/register") {
          navigate("/profile", { replace: true });
        }
      } else if (!publicRoutes.includes(location.pathname)) {
        // Redirect to login if not authenticated and not on a public route
        navigate("/login", { replace: true });
      }
    }
  }, [authData, loading, navigate, location.pathname]);
  

  const login = async (formData) => {
    try {
      const data = await authLogin(formData);
      setAuthData(data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };


const logout = async () => {
  try {
    await api.post("/auth/logout"); 
  
    setAuthData(null); 
    localStorage.removeItem("authData");
    
    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout failed", error);
  }
};



  return (
    <AuthContext.Provider value={{ authData, login, refreshToken, logout  }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

