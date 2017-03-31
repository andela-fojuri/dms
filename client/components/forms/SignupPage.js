import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';
import * as userActions from '../../actions/userActions';

class SignupPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      saving: false
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
      <SignupForm
        user={this.state.user}
        allRoles={this.props.roles}
        onSave={this.onClickSave}
        onChange={this.updateUserDetails}
        saving={this.state.saving}
      />
    );
  }
}

SignupPage.propTypes = {
  roles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

SignupPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const user = { roleId: '' };
  const rolesDropdown = state.roles.roles.map(role => ({
    value: role.id,
    text: role.category,
  }));
  return {
    roles: rolesDropdown,
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);

