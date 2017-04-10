import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import * as componentActions from '../../actions/componentActions';
import userImage from '../../images/user2.jpg';


export class DashboardMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getPublicDoc = this.getPublicDoc.bind(this);
    this.getSharedDoc = this.getSharedDoc.bind(this);
    this.getMyDoc = this.getMyDoc.bind(this);
    this.showRoles = this.showRoles.bind(this);
    this.showUsers = this.showUsers.bind(this);
    this.getAllDoc = this.getAllDoc.bind(this);
    this.getAccessDoc = this.getAccessDoc.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
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
    if (this.props.user.Role || nextProps.user.Role) {
      if (nextProps.user.Role.category === 'SuperAdmin' || nextProps.user.Role.category === 'Admin') {
        document.getElementById('forAdmin').style.display = 'block';
      }
    }
    $('.modal').modal();
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

  getPublicDoc() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showDocComponent();
    this.props.actions.getDocs('/public/documents/', 0, 10, 'Public Documents');
  }

  getSharedDoc() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showDocComponent();
    this.props.actions.getDocs('/role/documents/', 0, 10, 'Shared Documents');
  }

  getMyDoc() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showDocComponent();
    const id = localStorage.getItem('user');
    this.props.actions.getDocs(`/users/${id}/documents`, 0, 10, 'My Documents');
  }

  showRoles() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showRoleComponent();
    this.props.actions3.getRoles();
  }

  getAllDoc() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showDocComponent();
    this.props.actions.getDocs('/documents/', 0, 10, 'All Documents');
  }

  getAccessDoc() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showDocComponent();
    this.props.actions.getDocs('/user/documents/', 0, 10, 'Accessible Documents');
  }

  showUsers() {
    $('.button-collapse').sideNav('hide');
    this.props.actions4.showUserComponent();
    this.props.actions2.getUsers(0, 10);
  }

  editProfile() {
    $('#editDetails').modal('open');
  }


  render() {
    return (
      <div>
        <div id="menuButton" className="col s2">
          <ul id="slide-out" className="side-nav">
            <li>
              <div className="userView">
                <div className="background">
                  <img src={userImage} />
                </div>
                <a href="#!name">
                  <span className="black-text name">{this.props.user.username}</span>
                </a>
                <a href="#!email">
                  <span className="black-text email">{this.props.user.email}</span>
                </a>
                <a href="#!email" onClick={this.editProfile}>Edit Profile</a>
              </div>
            </li>
            <li>
              <a id="anyDoc" name="anyone" onClick={this.getAccessDoc} >Owned By Anyone</a>
            </li>
            <li>
              <a id="myDoc" name="myDoc" onClick={this.getMyDoc} >Owned By me</a>
            </li>
            <li>
              <a id="publicDoc" name="publicDoc" onClick={this.getPublicDoc}>Public</a>
            </li>
            <li>
              <a id="sharedDoc" name="shared" onClick={this.getSharedDoc} >Shared</a>
            </li>
            <div id="forAdmin">
              <li id="allDocs">
                <a name="allDocs" onClick={this.getAllDoc} >All Documents</a>
              </li>
              <li id="allUsers">
                <a name="users" onClick={this.showUsers} >Users</a>
              </li>
              <li id="allRoles">
                <a name="roles" onClick={this.showRoles} >Roles</a>
              </li>
            </div>
          </ul>
          <a data-activates="slide-out" id="button-collapse" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </div>
    );
  }

}

DashboardMenu.propTypes = {
  actions: PropTypes.object.isRequired,
  actions2: PropTypes.object.isRequired,
  actions3: PropTypes.object.isRequired,
  actions4: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

DashboardMenu.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const showDocument = state.mydocument.showDocument;
  const user = state.users.userDetails;
  return {
    documents,
    showDocument,
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    actions2: bindActionCreators(userActions, dispatch),
    actions3: bindActionCreators(roleActions, dispatch),
    actions4: bindActionCreators(componentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
