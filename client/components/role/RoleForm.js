import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Dropdown, NavItem } from 'react-materialize';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import * as roleActions from '../../actions/roleActions';

class RoleForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      category: props.editRole.category
    };
    this.updateState = this.updateState.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.showRoleForm = this.showRoleForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editRole.id !== nextProps.editRole.id) {
      this.setState(() =>
        Object.assign({}, nextProps.editRole)
      );
    }
  }

  updateState(event) {
    const field = event.target.value;
    this.setState({ category: field });
  }

  onClickAdd() {
    this.props.actions.createRole(this.state.category).then(() => {
      toastr.success('Role Successfully created');
    });
  }

  showRoleForm(index) {
    this.props.actions.editRole(Object.assign({}, this.props.roles[index]));
    $('#modal3').modal('close');
  }

  render() {
    return (
      <div>
        <div id="modal3" className="modal">
          <div className="modal-content">
            <h5> All Roles</h5>
            {this.props.roles.map((role, index) => (
              <div key={role.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <a name="myDoc" className="grey-text text-darken-4" onClick={() => { this.showRoleForm(index); }}>{role.category}</a>
                      <a id="deleteIcon" name="delete" onClick={() => { this.deleteRole(role.id, index); }}><i className="material-icons right">delete</i></a>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>

        <div id="modal2" className="modal">
          <div className="modal-content">
            <div className="row">
              <form>
                <div className="row">
                  <div className="col s12">
                    <TextInput
                      name="category"
                      label=" Enter Category"
                      onChange={this.updateState}
                      value={this.state.category}
                    />
                  </div>
                  <input
                    id="createBtn"
                    name="create"
                    type="button"
                    className="waves-effect waves-light btn"
                    value="Add"
                    onClick={this.onClickAdd}
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

RoleForm.propTypes = {
  actions: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  editRole: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    roles: state.roles.roles,
    editRole: state.roles.editRole
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);

