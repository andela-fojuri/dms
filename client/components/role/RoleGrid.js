import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/roleActions';

export class RoleGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
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
      <div className="col s11">
        <div className="docTable">
          <h4 className="roleLabel"> All Roles</h4>
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

    );
  }
}

RoleGrid.propTypes = {
  roles: PropTypes.array.isRequired,
  editRole: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleGrid);

