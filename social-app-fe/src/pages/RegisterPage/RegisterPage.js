import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import authAPI from "../../services/apis/authAPI";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const initialValues = {
  email: "",
  password: "",
  fullname: "",
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await authAPI.register(values);
        navigate("/login");
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, isValid, values, handleChange } = formik;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            name="fullname"
            id="fullname"
            onChange={handleChange}
            value={values.fullname}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>

        <div>
          <label htmlFor="id">Password</label>
          <input
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        {error && <p>{error}</p>}
        <button disabled={!isValid}>{loading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default RegisterPage;
