import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  if (!authData) {
    return <LoginPage />; // Redirect to login if not authenticated
  }
  return children;
};
function App() {
  return (

      <AuthProvider>
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile /> {/* Protected profile route */}
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </NextUIProvider>
      </AuthProvider>

  );
}

export default App;
