import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            myNoteBook
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  to='/about'>
                  About
                </Link>
              </li>
            </ul>
            <div className='d-flex'>
              {!localStorage.getItem('token') ? (
                <>
                  <Link className='btn btn-primary mx-1' to='/login' role='button'>
                    Log In
                  </Link>
                  <Link className='btn btn-primary mx-1' to='/signup' role='button'>
                    Sign Up
                  </Link>
                </>
              ) : (
                <button className='btn btn-danger' onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
