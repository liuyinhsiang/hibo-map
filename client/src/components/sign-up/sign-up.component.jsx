import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/alert/alert.actions';
import { register } from '../../redux/auth/auth.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          label="Display Name"
          autoComplete="off"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          label="Email"
          autoComplete="off"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          label="Password"
          autoComplete="off"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          label="Confirm Password"
          autoComplete="off"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(SignUp);
