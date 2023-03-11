import React, { useState, useRef } from 'react';
import 'assets/styles/navbar.css';
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
    <header className="nav-wrapper">
      <Link to={'/'} className="logo">
        <h1 className="logo">Bookkeeper</h1>
      </Link>
      <button
        aria-controls="nav-link"
        aria-expanded="false"
        className="menu-btn"
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
        <ul className="nav-link" data-visible="false" ref={toggleMenu}>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              Records
            </Link>
          </li>
          <li>
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
