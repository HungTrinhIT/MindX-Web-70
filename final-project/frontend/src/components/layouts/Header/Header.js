import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const {
    handleLogout,
    auth: { isAuthenticated },
  } = useContext(AuthContext);
  const onHandleLogOut = () => {
    localStorage.removeItem('accessToken');

    handleLogout();
    navigate('/login');
  };

  const notAuthenticatedNavs = (
    <>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
    </>
  );

  const authenticatedNavs = (
    <>
      <li className='nav-item'>
        <Link className='nav-link active' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link active' to='/profile'>
          Profile
        </Link>
      </li>
      <li className='nav-item'>
        <button className='btn btn-primary' onClick={onHandleLogOut}>
          Log out
        </button>
      </li>
    </>
  );

  const navs = isAuthenticated ? authenticatedNavs : notAuthenticatedNavs;

  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <h3>KBook Social</h3>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>{navs}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
