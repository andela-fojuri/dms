import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentFormComponent from '../document/DocumentForm';
import DocumentGridComponent from '../document/DocumentGrid';
import RoleGridComponent from '../role/RoleGrid';
import * as documentActions from '../../actions/documentActions';
import DashboardMenuComponent from './DashboardMenu';
import RoleFormComponent from '../role/RoleForm';
import UsersFormCompnent from '../user/forms/UsersForm';
import UsersPageComponent from '../user/UsersPage';


export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDoc: props.showDoc,
      showUsers: props.showUsers,
      showRoles: props.showRoles
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showDoc !== this.props.showDoc) {
      this.setState(() =>
        Object.assign({}, { showDoc: nextProps.showDoc })
      );
    }
    if (nextProps.showUsers !== this.props.showUsers) {
      this.setState(() =>
        Object.assign({}, { showUsers: nextProps.showUsers })
      );
    }
    if (nextProps.showRoles !== this.props.showRoles) {
      this.setState(() =>
        Object.assign({}, { showRoles: nextProps.showRoles })
      );
    }
    if (this.props.showDoc || this.props.showUsers) {
      this.setState(() =>
        Object.assign({}, { showDoc: nextProps.showDoc, showUsers: nextProps.showUsers, showRoles: nextProps.showRoles })
      );
    }
  }

  render() {
    if (this.state.showDoc) {
      return (
        <div className="row">
          <DashboardMenuComponent />
          <DocumentFormComponent />
          <DocumentGridComponent />
          <RoleFormComponent />
          <UsersFormCompnent />
        </div>
      );
    } else if (this.state.showUsers) {
      return (
        <div className="row">
          <DashboardMenuComponent />
          <UsersPageComponent />
          <DocumentFormComponent />
          <RoleFormComponent />
          <UsersFormCompnent />
        </div>
      );
    } else if (this.state.showRoles) {
      return (
        <div className="row">
          <DashboardMenuComponent />
          <RoleFormComponent />
          <RoleGridComponent />
          <DocumentFormComponent />
          <UsersFormCompnent />
        </div>
      );
    }
    return (
      <div className="row">
        <DashboardMenuComponent />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  showDoc: PropTypes.bool.isRequired,
  showUsers: PropTypes.bool.isRequired,
  showRoles: PropTypes.bool.isRequired
};

DashboardPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  const showDoc = state.components.showDoc;
  const showUsers = state.components.showUsers;
  const showRoles = state.components.showRoles;
  return {
    showDoc,
    showUsers,
    showRoles
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

