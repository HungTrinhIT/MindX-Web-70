import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import authAPI from "../../apis/authAPI";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth, handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authAPI.login(values);
        const { accessToken } = response.data;
        // Save access token to local storage
        localStorage.setItem("accessToken", accessToken);

        // Call logic after login successfully
        await handleLogin();

        // Redirect to homepage
        navigate("/");
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Hello, welcome back to KBook</h4>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        {error && (
          <p
            style={{
              color: "red",
              margin: "10px 0",
            }}
          >
            {error}
          </p>
        )}
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;

// Form
// CORS: cross origin resource sharing
//  mo cors
//

//  not authenticate
//      X Homepage
//      Login Register

//  authenticate
//      Homepage
//      X Login Register

// http://localhost:3000/api/v1/auth/me
