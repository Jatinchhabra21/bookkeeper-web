import React, { useState, useRef } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';

export default function NavBar() {
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);
  const toggleMenu = useRef();

  const handleMenuToggle = (event) => {
    toggleMenu.current.dataset.visible = !mobileNavExpanded;
    event.target.setAttribute('aria-expanded', !mobileNavExpanded);
    setMobileNavExpanded((isExpanded) => !isExpanded);
  };

  return (
    <header className="navbar__nav-wrapper">
      <Link to={'/'} className="navbar__nav-logo">
        <h1 className="navbar__nav-logo">Bookkeeper</h1>
      </Link>
      <button
        aria-controls="navbar__link-wrapper"
        aria-expanded="false"
        className="navbar__menu-btn"
      >
        <span className="sr-only">Menu</span>
        {mobileNavExpanded ? (
          <FiX
            onClick={handleMenuToggle}
            style={{
              background: 'transparent',
              height: '32px',
              width: '32px',
              top: '1rem',
              right: '1.5rem',
            }}
            className="fixed"
          />
        ) : (
          <FiMenu
            onClick={handleMenuToggle}
            style={{
              background: 'transparent',
              height: '32px',
              width: '32px',
            }}
          />
        )}
      </button>
      <nav>
        <ul
          className="navbar__link-wrapper"
          data-visible="false"
          ref={toggleMenu}
        >
          <li>
            <Link className="navbar__nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar__nav-link" to="/record">
              Records
            </Link>
          </li>
          <li>
            <Link className="navbar__nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="navbar__nav-link" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
