import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import authAPI from "../../services/apis/authAPI";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({ user: {}, isAuthenticated: false });

  const handleLogin = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data;

      setAuth({
        user: data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setAuth({
      isAuthenticated: false,
      user: {},
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      handleLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        handleLogin,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
