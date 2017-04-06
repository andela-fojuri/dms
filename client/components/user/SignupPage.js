import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupFormComponent from './forms/SignupForm';
import * as userActions from '../../actions/userActions';

export class SignupPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {}
    };
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onClickSave() {
    this.props.actions.createUser(this.state.user).then(() => {
      this.context.router.push('/');
    });
  }

  updateUserDetails(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState(user);
  }

  render() {
    return (
      <SignupFormComponent
        onSave={this.onClickSave}
        onChange={this.updateUserDetails}
      />
    );
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object.isRequired
};

SignupPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);

