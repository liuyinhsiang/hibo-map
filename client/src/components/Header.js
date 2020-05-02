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
          <a className="item right" href="/auth/google">
            Login with Google
          </a>
        );
      default:
        return [
          <a className="item right" href="/">
            <i className="map icon"></i>Map
          </a>,
          <a className="item" href="/api/logout">
            Logout
          </a>,
        ];
    }
  }

  render() {
    return (
      <div className="ui inverted menu">
        <Link to={this.props.auth ? '/dashboard' : '/'} className="item">
          Hibo Map
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
