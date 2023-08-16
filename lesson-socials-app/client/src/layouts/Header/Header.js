import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  const baseNavItemClass = " hover:text-gray-500 px-4 py-2 rounded-md";
  return (
    <header className="bg-blue-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-white font-bold text-lg">Facebook</h3>
        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${baseNavItemClass} text-gray-500`
                    : `${baseNavItemClass} text-white`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                activeClassName="text-gray-500"
                className={({ isActive }) =>
                  isActive
                    ? `${baseNavItemClass} text-gray-500`
                    : `${baseNavItemClass} text-white`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                activeClassName="text-gray-500"
                className={({ isActive }) =>
                  isActive
                    ? `${baseNavItemClass} text-gray-500`
                    : `${baseNavItemClass} text-white`
                }
              >
                Sign up
              </NavLink>
            </li>
            {isAuthenticated && (
              <button onClick={onLogoutHandler}>Logout</button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
