import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: this.props.editUser
    };

    this.showUserForm = this.showUserForm.bind(this);
  }

  showUserForm(index) {
    this.props.actions.editUser(Object.assign({}, this.props.users[index]));
    $('#usersModal').modal('close');
  }

  render() {
    return (
      <div>
        <div id="usersModal" className="modal">
          <div className="modal-content">
            <h5>All users</h5>
            {this.props.users.map((user, index) => (
              <div key={user.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <a name="myDoc" className="grey-text text-darken-4" onClick={() => { this.showUserForm(index); }}>{user.username}</a>
                      <a id="deleteIcon" name="delete" onClick={() => { this.deleteRole(user.id, index); }}><i className="material-icons right">delete</i></a>
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
                    label="Username"
                    onChange={this.onChangeUser}
                    icon="account_circle"
                    value={this.state.user.username}
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
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="col s6">
                  <SelectInput
                    defaultOption="Select your role"
                    name="roleId"
                    options={this.props.roles}
                    onChange={this.onChangeUser}
                    value={this.state.user.roleId}
                    label="Role"
                  />
                </div>
                <input
                  type="button"
                  value="Update"
                  className="waves-effect waves-light btn"
                  onClick={this.onSave}
                />
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
  console.log(state);
  const rolesDropdown = state.roles.roles.map(role => ({
    value: role.id,
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
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

