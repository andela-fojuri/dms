import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {}
    };
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    this.props.actions.userLogoutSuccess();
  }

  render() {
    if (this.props.user.id) {
      return (
        <Link id="logout" className="brandLogo right" to="/" onClick={this.onClickLogout} activeClassName="active">logout</Link>
      );
    }
    return (<div />);
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const user = state.users.userDetails;
  return {
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

