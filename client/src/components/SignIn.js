import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit} className="ui form">
          <label>email</label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
            required
            autoComplete="off"
          />
          <label>password</label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
            required
            autoComplete="off"
          />
          <button className="ui button primary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
