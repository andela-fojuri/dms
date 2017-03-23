import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';
import * as userActions from '../../actions/userActions';

class SignupPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user),
      saving: false
    };
  }
  render() {
    return (
      <SignupForm
        user={this.state.user}
        allRoles={this.props.roles}
        onSave=""
        onChange=""
        saving={this.state.saving}
      />
    );
  }
}

SignupPage.propTypes = {
  roles: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const rolesDropdown = state.roles.map(role => ({
    value: role.id,
    text: role.category
  }));

  return {
    roles: rolesDropdown
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);

