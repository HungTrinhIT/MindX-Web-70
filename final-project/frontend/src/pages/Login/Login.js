import React, { useContext, useState } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import authAPI from "../../apis/authAPI";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const LoginFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email does not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

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
    validationSchema: LoginFormValidationSchema,
  });

  const { handleSubmit, handleChange, values, isValid, errors } = formik;

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <form onSubmit={handleSubmit} className="p-4 rounded-2 shadow">
        <h4>Hello, welcome back to KBook</h4>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            className="form-control"
            onChange={handleChange}
            value={values.email}
          />
          {errors?.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            className="form-control"
            type="password"
            id="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors?.password && (
            <small className="text-danger">{errors.password}</small>
          )}
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
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
