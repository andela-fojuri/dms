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
    this.deleteRole = this.deleteRole.bind(this);
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
    $('#editRole').modal('open');
  }

  deleteRole(id) {
    this.props.actions.deleteRole(id).then(() => {
      this.props.actions.getRoles();
    });
  }

  render() {
    return (
      <div>
        <div className="col s11">
          <div className="docTable">
            <h5> All Roles</h5>
            {this.props.roles.map((role, index) => (
              <div key={role.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <a name="myDoc" className="grey-text text-darken-4" onClick={() => { this.showRoleForm(index); }}>{role.category}</a>
                      <a id="deleteIcon" name="delete" onClick={() => { this.deleteRole(role.id); }}><i className="material-icons right">delete</i></a>
                      <a id="editIcon" name="delete" onClick={() => { this.showRoleForm(index); }}><i className="material-icons right">mode_edit</i></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="editRole" className="modal">
          <div className="modal-content">
            <div className="row">
              <form>
                <div className="row">
                  <div className="col s12">
                    <TextInput
                      name="category"
                      onChange={this.updateState}
                      value={this.state.category || ''}
                      placeholder="Enter Category"
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

