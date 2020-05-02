import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="item">
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li className="item" key="1">
            <i className="map icon"></i>Map
          </li>,
          <li className="item" key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <div className="ui inverted menu">
        <Link to={this.props.auth ? '/dashboard' : '/'} className="item">
          Hibo Map
        </Link>
        <ul className="right item">{this.renderContent()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
