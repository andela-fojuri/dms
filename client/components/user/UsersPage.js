import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as componentActions from '../../actions/componentActions';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DashboardMenu from '../dashboard/DashboardMenu';
import RoleForm from '../role/RoleForm';
import Pagination from '../pagination/Pagination';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: this.props.editUser.id,
      username: this.props.editUser.username,
      email: this.props.editUser.email,
      roleId: this.props.editUser.roleId
    };

    this.showUserForm = this.showUserForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  componentDidMount() {
    // $(document).ready(() => {
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
    // ]});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editUser) {
      if (this.props.editUser.id !== nextProps.editUser.id) {
        this.setState(() =>
          Object.assign({}, nextProps.editUser)
        );
      }
    }
  }

  onChangeUser(event) {
    const field = event.target.name;
    const value = event.target.value;
    this.setState(() => ({ [field]: value }));
  }

  onClickSave() {
    this.props.actions.updateUser(this.state).then(() => {
      $('#editUser').modal('close');
    });
  }

  deleteUser(id) {
    this.props.actions.deleteUser(id).then(() => {
      this.props.actions.getUsers();
    });
  }

  showUserForm(index) {
    $('#editUser').modal('open');
    this.props.actions.editUser(Object.assign({}, this.props.users[index]));
  }

  render() {
    return (
      <div className="row">
        <div className="col s11">
          <div className="docTable">
            <h4 className="userLabel">All Users</h4>
            {this.props.users.map((user, index) => (
              <div key={user.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <a name="myDoc" className="grey-text text-darken-4" onClick={() => { this.showUserForm(index); }}>{user.username}</a>
                      <a id="deleteIcon" name="delete" onClick={() => { this.deleteUser(user.id); }}><i className="material-icons right">delete</i></a>
                      <a id="editIcon" name="delete" onClick={() => { this.showUserForm(index); }}><i className="material-icons right">mode_edit</i></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="editUser" className="modal">
          <div className="modal-content">
            <div className="row">
              <form>
                <h5>Edit User</h5>
                <div className="row">
                  <TextInput
                    name="username"
                    onChange={this.onChangeUser}
                    icon="account_circle"
                    value={this.state.username || ''}
                    placeholder="Enter username"
                  />
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">mail_outline</i>
                    <input
                      type="email"
                      name="email"
                      className="validate"
                      onChange={this.onChangeUser}
                      value={this.state.email || ''}
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6">
                    <SelectInput
                      defaultOption="Select your role"
                      name="roleId"
                      options={this.props.roles}
                      onChange={this.onChangeUser}
                      value={this.state.roleId}
                    />
                  </div>
                  <input
                    type="button"
                    value="Update"
                    className="waves-effect waves-light btn"
                    onClick={this.onClickSave}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  editUser: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const rolesDropdown = state.roles.roles.map(role => ({
    value: Number(role.id),
    text: role.category,
  }));
  return {
    users: state.users.users,
    roles: rolesDropdown,
    editUser: state.users.editUser
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    actions2: bindActionCreators(componentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

