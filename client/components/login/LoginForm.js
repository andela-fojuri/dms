import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import * as userActions from '../../actions/userActions';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userLogin: { username: '', password: '' }
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  onClickLogin() {
    this.props.actions.login(this.state.userLogin);
  }

  usernameChange(event) {
    const userLogin = this.state.userLogin;
    userLogin.username = event.target.value;
    this.setState({ userLogin });
  }

  passwordChange(event) {
    const userLogin = this.state.userLogin;
    userLogin.password = event.target.value;
    this.setState({ userLogin });
  }

  userRow(userLogin, index) {
    return <div key={index}>{userLogin.username}{userLogin.password}</div>;
  }
  render() {
    return (
      <div className="row">
        <h3>User</h3>
        {this.props.loginDetails.map(this.userRow)}
        <form>
          <h5>Login</h5>
          <div className="row">
            <TextInput
              name="username"
              label="Username"
              icon="account_circle"
              onChange={this.usernameChange}
            />
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">https</i>
              <input
                type="password"
                name="password"
                className="validate"
                onChange={this.passwordChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <input
            type="button"
            className="waves-effect waves-light btn"
            value="Login"
            onClick={this.onClickLogin}
          />
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginDetails: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    loginDetails: state.loginDetails
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
