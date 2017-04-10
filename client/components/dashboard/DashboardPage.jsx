import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentFormComponent from '../document/DocumentForm';
import DocumentGridComponent from '../document/DocumentGrid';
import RoleGridComponent from '../role/RoleGrid';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';
import DashboardMenuComponent from './DashboardMenu';
import RoleFormComponent from '../role/RoleForm';
import UsersFormCompnent from '../user/forms/UsersForm';
import UsersPageComponent from '../user/UsersPage';
import EditUserForm from '../user/forms/EditUserForm';


export class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDoc: props.showDoc,
      showUsers: props.showUsers,
      showRoles: props.showRoles
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.updateSate = this.updateSate.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      // stopPropagation: false // Stops event propagation
    }
    );
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
        Object.assign({},
          {
            showDoc: nextProps.showDoc,
            showUsers: nextProps.showUsers,
            showRoles: nextProps.showRoles
          })
      );
    }
  }

  updateSate(event) {
    const field = event.target.name;
    const value = event.target.value;
    this.setState(() => (
      Object.assign({}, this.state, { [field]: value }))
    );
  }

  onClickSave() {
    this.props.actions2.updateUser({
      id: this.props.user.id,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword
    }).then(() => {
      $('#editProfile').modal('close');
    });
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
          <EditUserForm onChange={this.updateSate} onSave={this.onClickSave} />
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
          <EditUserForm onChange={this.updateSate} onSave={this.onClickSave} />
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
          <EditUserForm onChange={this.updateSate} onSave={this.onClickSave} />
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
  actions2: PropTypes.object.isRequired,
  showDoc: PropTypes.bool.isRequired,
  showUsers: PropTypes.bool.isRequired,
  showRoles: PropTypes.bool.isRequired,
  user: PropTypes.object
};

DashboardPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const showDoc = state.components.showDocument;
  const showUsers = state.components.showUsers;
  const showRoles = state.components.showRoles;
  const user = state.users.userDetails;
  return {
    showDoc,
    showUsers,
    showRoles,
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    actions2: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

