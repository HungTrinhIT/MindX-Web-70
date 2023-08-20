import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import authAPI from "../../services/apis/authAPI";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginErorr] = useState("");

  const {
    handleLogin,
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoginLoading(true);
        const response = await authAPI.login(values);
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        await handleLogin();
        navigate("/");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        setLoginErorr(error.response.data.message);
      } finally {
        setLoginLoading(false);
      }
    },
  });

  const { handleSubmit, isValid, values, handleChange } = formik;
  console.log("isAuthenticated:", isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Email</label>
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
        {loginError && <p>{loginError}</p>}
        <button disabled={!isValid}>
          {loginLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
