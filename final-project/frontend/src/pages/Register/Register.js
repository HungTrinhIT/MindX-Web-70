import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import authAPI from "../../apis/authAPI";

const Register = () => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        await authAPI.register(values);
        navigate("/login");
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange, isValid } = formik;

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register an account</h3>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input id="fullname" name="fullname" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" onChange={handleChange} />
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
        <button type="submit">{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default Register;
