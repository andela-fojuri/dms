import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import * as roleActions from '../../actions/roleActions';

class RoleForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: props.editRole.id,
      category: props.editRole.category
    };
    this.updateState = this.updateState.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editRole && nextProps.editRole) {
      if (this.props.editRole.id !== nextProps.editRole.id) {
        this.setState(() =>
          Object.assign({}, nextProps.editRole)
        );
      }
    }
  }

  onClickAdd() {
    this.props.actions.saveRole(this.state).then(() => {
      toastr.success('Role Successfully saved');
      this.props.actions.getRoles();
      $('#editRole').modal('close');
    });
  }

  updateState(event) {
    const field = event.target.value;
    this.setState({ category: field });
  }

  render() {
    return (
      <div>
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
  editRole: PropTypes.object
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

