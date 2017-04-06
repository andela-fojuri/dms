import React, { PropTypes } from 'react';
import LoginPageComponent from '../user/LoginPage';
import SignupPageComponent from '../user/SignupPage';


export class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      islogin: false,
      isSignup: false
    };

    this.displayLoginForm = this.displayLoginForm.bind(this);
    this.displaySignupForm = this.displaySignupForm.bind(this);
  }

  displayLoginForm() {
    this.context.router.push('/login');
    this.setState({ islogin: true });
    this.setState({ isSignup: false });
  }

  displaySignupForm() {
    this.context.router.push('/signup');
    this.setState({ isSignup: true });
    this.setState({ islogin: false });
  }

  render() {
    if (this.state.islogin) {
      return (
        <div id="login" className="z-depth-1 card-panel">
          <LoginPageComponent />
          <p> Dont have an account yet? <a id="signupLink" name="signupLink" onClick={this.displaySignupForm}>Signup</a></p>
        </div>
      );
    } else if (this.state.isSignup) {
      return (
        <div id="signup" className="z-depth-1 card-panel">
          <SignupPageComponent />
          <p> Already have an account? <a onClick={this.displayLoginForm}>Login</a></p>
        </div>
      );
    }
    return (
      <div id="start">
        <button id="startBtn" className="btn waves-effect waves-light blue-grey darken-4" onClick={this.displayLoginForm} type="submit" name="action">Get Started
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

export default HomePage;
