import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import LoginFormComponent from './forms/LoginForm';
import * as userActions from '../../actions/userActions';
import * as documentActions from '../../actions/documentActions';
import * as roleActions from '../../actions/roleActions';

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
    this.props.actions.loginUser(this.state.userLogin).then(() => {
      this.props.actions2.getDocs('/user/documents/', 0, 10, 'Accessible Documents');
      this.props.actions3.getRoles();
      browserHistory.push('/dashboard');
      toastr.success('Successfully Looged in');
    });
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
  actions2: PropTypes.object,
  actions3: PropTypes.object,
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
    actions: bindActionCreators(userActions, dispatch),
    actions2: bindActionCreators(documentActions, dispatch),
    actions3: bindActionCreators(roleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

