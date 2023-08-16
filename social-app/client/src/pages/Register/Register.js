import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Register = () => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <div></div>;
};

export default Register;
