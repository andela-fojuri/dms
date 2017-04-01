import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import userImage from '../../images/user2.jpeg';

class DashboardMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.showModal = this.showModal.bind(this);
    this.getPublicDoc = this.getPublicDoc.bind(this);
    this.getSharedDoc = this.getSharedDoc.bind(this);
    this.getMyDoc = this.getMyDoc.bind(this);
    this.createRoleModal = this.createRoleModal.bind(this);
    this.showRoles = this.showRoles.bind(this);
    this.showUsers = this.showUsers.bind(this);
    this.getAllDoc = this.getAllDoc.bind(this);
    this.getAccessDoc = this.getAccessDoc.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user.Role || nextProps.user.Role) {
      if (nextProps.user.Role.category === 'SuperAdmin' || nextProps.user.Role.category === 'Admin') {
        document.getElementById('forAdmin').style.display = 'block';
      }
    }
  }

  getPublicDoc() {
    this.props.actions.getPublicDocument();
  }

  getSharedDoc() {
    this.props.actions.getRoleDocument();
  }

  getMyDoc() {
    this.props.actions.getDocuments();
  }

  showModal() {
    this.props.actions.newDocument({ title: '', access: '', content: '', id: '' });
    $('#modal1').modal('open');
  }

  createRoleModal() {
    if (this.props.user.Role.category === 'SuperAdmin' || this.props.user.Role.category === 'Admin') {
      this.props.actions3.editRole({ category: '', id: '' });
      $('#modal2').modal('open');
    } else {
      toastr.error('You are not Authorized to view this page');
    }
  }

  showUsers() {
    this.props.actions2.getUsers().then(() => {
      $('#usersModal').modal('open');
    });
  }

  showRoles() {
    this.props.actions3.getRoles().then(() => {
      $('#modal3').modal('open');
    });
  }

  getAllDoc() {
    this.props.actions.getAllDocuments();
  }

  getAccessDoc() {
    this.props.actions.getAccessibleDocuments();
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
                <a href="#!name"><span className="black-text name">{this.props.user.username}</span></a>
                <a href="#!email"><span className="black-text email">{this.props.user.email}</span></a>
                <a href="#!email">My Profile</a>
              </div>
            </li>
            <li><a name="create" onClick={this.showModal} ><i className="material-icons">add</i>New Doc</a></li>
            <li><a name="anyone" onClick={this.getAccessDoc} >Owned By Anyone</a></li>
            <li><a name="myDoc" onClick={this.getMyDoc} >Owned By me</a></li>
            <li><a name="PublicDoc" onClick={this.getPublicDoc}>Public</a></li>
            <li><a name="shared" onClick={this.getSharedDoc} >Shared</a></li>
            <div id="forAdmin"><li><a name="allDoc" onClick={this.getAllDoc} >All Documents</a></li>
              <li><a name="role" onClick={this.createRoleModal} >CreateRole</a></li>
              <li id=""><a name="users" onClick={this.showUsers} >Users</a></li>
              <li><a name="roles" onClick={this.showRoles} >Roles</a></li></div>
          </ul>
          <a data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
      </div>
    );
  }

}

DashboardMenu.propTypes = {
  actions: PropTypes.object.isRequired,
  actions2: PropTypes.object.isRequired,
  actions3: PropTypes.object.isRequired,
  showDocument: PropTypes.object.isRequired,
  user: PropTypes.object,
  onChange: PropTypes.func
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
    actions3: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
