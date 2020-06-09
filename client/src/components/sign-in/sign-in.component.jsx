import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../redux/auth/auth.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <FormInput
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          label="email"
          autoComplete="off"
          // required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          label="password"
          autoComplete="off"
          // required
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          {/* <CustomButton
              onClick={() => (window.location.href = 'auth/google')}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
