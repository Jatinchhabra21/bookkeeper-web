import React, { useState } from 'react';
import 'assets/styles/navbar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  const handleMenuToggle = (event) => {
    event.target.nextSibling.children[0].dataset.visible = !mobileNavExpanded;
    event.target.setAttribute('aria-expanded', !mobileNavExpanded);
    setMobileNavExpanded((isExpanded) => !isExpanded);
    event.target.style.backgroundImage = mobileNavExpanded
      ? "url('src/assets/icons/menu.png')"
      : "url('src/assets/icons/close.png')";
  };

  return (
    <header className="nav-wrapper">
      <h1 className="logo">Bookkeeper</h1>
      <button
        aria-controls="nav-link"
        aria-expanded="false"
        className="menu-btn"
        onClick={handleMenuToggle}
      >
        <span className="sr-only">Menu</span>
      </button>
      <nav>
        <ul className="nav-link" data-visible="false">
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
