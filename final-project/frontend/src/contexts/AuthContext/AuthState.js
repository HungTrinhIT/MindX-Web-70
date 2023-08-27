import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import authAPI from "../../apis/authAPI";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });

  //   1. Call API /me => userInfo
  //   2. Update auth state
  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data;

      setAuth({
        isAuthenticated: true,
        user: data.userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    await fetchCurrentUser();
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: {},
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        handleLogin,
        handleLogout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
