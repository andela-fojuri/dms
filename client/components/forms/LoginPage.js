import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Delay from 'react-delay';
import LoginForm from './LoginForm';
import * as userActions from '../../actions/userActions';
import * as documentActions from '../../actions/documentActions';

class LoginPage extends React.Component {
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
        // this.context.router.push('/dashboard');
      // });
      // this.props.actions2.getPublicDocument();
      // this.props.actions2.getRoleDocument();
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
        <LoginForm
          onClick={this.onClickLogin}
          onChange={this.updateLoginState}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  actions2: PropTypes.object.isRequired
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

