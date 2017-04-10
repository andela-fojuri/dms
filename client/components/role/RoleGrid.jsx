import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/roleActions';
import Grid from '../grid/Grid';
import Collection from '../grid/Collection';

export class RoleGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.showRoleForm = this.showRoleForm.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.createRoleModal = this.createRoleModal.bind(this);
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

  createRoleModal() {
    $('.button-collapse').sideNav('hide');
    this.props.actions.editRole({ category: '', id: '' });
    $('#editRole').modal('open');
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="otherTable">
            <Collection label="All roles" onClick={this.createRoleModal} />
            <div className="collection-item">
              {this.props.roles.map((role, index) => (
                <Grid
                  key={role.id}
                  rolecategory={role.category}
                  deleteIcon="delete"
                  editIcon="mode_edit"
                  onClickDelete={() => { this.deleteRole(role.id); }}
                  onClickEdit={() => { this.showRoleForm(index); }} />
              ))}
            </div>
          </div>
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

