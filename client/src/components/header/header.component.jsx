import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/auth/auth.actions';

import mapIcon from '../../assets/map-marked.ico';

import './header.styles.css';

const Header = ({
  auth: { isAuthenticated, loading },
  defaultMaps,
  logout,
}) => (
  <div className="header">
    <Link to="/">
      <img src={mapIcon} className="map-icon" alt="map-icon" />
    </Link>
    <a href="/" className="hibo-text">
      Hibo Map
    </a>
    <nav>
      <div className="options">
        <Link className="option" to="/maps">
          Maps
        </Link>
        <Link className="option" to="/about">
          About
        </Link>
        {isAuthenticated ? (
          <Link className="option" onClick={logout} to="/">
            Logout
          </Link>
        ) : (
          <Link className="option" to="/sign-in">
            Sign In
            {/* <button className="nav-button">Sign In</button> */}
          </Link>
        )}
      </div>
    </nav>
    <a className="nav-button" href="/contact">
      Contact
      {/* <button className="nav-button">Contact</button> */}
    </a>
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
  defaultMaps: state.defaultMaps,
});

export default connect(mapStateToProps, { logout })(Header);
