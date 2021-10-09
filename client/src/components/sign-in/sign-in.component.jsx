import './sign-in.styles.scss';
import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart } from '../../redux/user/user.action';
import { connect } from 'react-redux';
import { emailSignInStart } from './../../redux/user/user.action';
const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const { email, password } = userInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log(error);
    // }
    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newUserInfo = {
      ...userInfo,
      [name]: value,
    };
    setUserInfo(newUserInfo);
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span className="title">Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* <input
            name="email"
            type="email"
            value={this.state.email}
            required
            onChange={this.handleChange}
          />
          <label>Email</label> */}
        <FormInput
          name="email"
          type="email"
          value={email}
          required
          handleChange={handleChange}
          label="Email"
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          required
          handleChange={handleChange}
          label="Password"
        />

        {/* <input
            name="password"
            type="password"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label>Password</label> */}
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            onClick={googleSignInStart}
            isGoogleSignIn
            type="button"
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
