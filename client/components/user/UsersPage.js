import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

export class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.limit = 10;
    this.state = {
      id: this.props.editUser.id,
      username: this.props.editUser.username,
      email: this.props.editUser.email,
      roleId: this.props.editUser.roleId
    };

    this.showUserForm = this.showUserForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.getTotalPage = this.getTotalPage.bind(this);
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
    if (this.props.editUser) {
      if (this.props.editUser.id !== nextProps.editUser.id) {
        this.setState(() =>
          Object.assign({}, nextProps.editUser)
        );
      }
    }
  }

  getTotalPage() {
    const { totalUsers } = this.props;
    return totalUsers % this.limit === 0 ? Math.floor(totalUsers / this.limit) : Math.floor(totalUsers / this.limit) + 1;
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

  handlePagination(page) {
    const offset = page.selected * this.limit;
    this.props.actions.getUsers(offset, this.limit);
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
          <ReactPaginate
            pageCount={this.getTotalPage()}
            pageRangeDisplayed={0}
            marginPagesDisplayed={5}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="waves_effect"
            onPageChange={this.handlePagination}
            pageLinkClassName="paginateLink" />
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  editUser: PropTypes.object.isRequired,
  totalUsers: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users.users,
    editUser: state.users.editUser,
    totalUsers: state.users.totalUsers
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

