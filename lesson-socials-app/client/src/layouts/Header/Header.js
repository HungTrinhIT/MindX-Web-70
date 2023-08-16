import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Header = () => {
  const {
    handleLogOut,
    auth: { isAuthenticated },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    handleLogOut();
    navigate("/login");
  };
  return (
    <header>
      <h3>Facebook</h3>
      <nav>
        <ul>
          <li>
            <Link to="/login">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
          {isAuthenticated && <button onClick={onLogoutHandler}>Logout</button>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
