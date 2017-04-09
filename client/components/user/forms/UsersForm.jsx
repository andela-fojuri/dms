import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../../actions/userActions';
import * as componentActions from '../../../actions/componentActions';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

export class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: this.props.editUser.id,
      username: this.props.editUser.username,
      email: this.props.editUser.email,
      roleId: this.props.editUser.roleId
    };

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
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
    const user = this.state;
    if (!user.username || !user.email || !user.password
    || !!user.password_confirmation || !user.roleId) {
      toastr.error('All field(s) must be filled');
    } else {
      this.props.actions.updateUser(this.state).then(() => {
        $('#editUser').modal('close');
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div id="editUser" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="row">
                <a className="right modal-close ">
                  <i className="black material-icons right">clear</i>
                </a>
              </div>
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

