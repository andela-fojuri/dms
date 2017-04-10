import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginFormComponent from './forms/LoginForm';
import * as userActions from '../../actions/userActions';

export class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userLogin: { username: '', password: '' }
    };

    this.onClickLogin = this.onClickLogin.bind(this);
    this.updateLoginState = this.updateLoginState.bind(this);
  }

  onClickLogin() {
    this.props.actions.loginUser(this.state.userLogin);
  }


  updateLoginState(event) {
    const field = event.target.name;
    const userLogin = this.state.userLogin;
    userLogin[field] = event.target.value;
    return this.setState(userLogin);
  }

  render() {
    return (
      <div>
        <LoginFormComponent
          onClick={this.onClickLogin}
          onChange={this.updateLoginState}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object,
};

LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

