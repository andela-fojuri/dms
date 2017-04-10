import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {}
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    const value = event.target.value;
    if (this.props.showDoc) {
      this.props.actions.searchDocument(value);
    } else if (this.props.showUsers) {
      this.props.actions2.searchUser(value);
    }
  }
  render() {
    if (this.props.user.id) {
      return (
        <div className="right hide-on-med-and-down">
          <ul>
            <form>
              <li className="input-field">
                <input id="search" type="search" onChange={this.onSearchChange} required />
                <label
                  id="searchIcon"
                  className="label-icon"
                  htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
              </li>
            </form>
          </ul>
        </div>
      );
    }
    return (<div />);
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  actions2: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  showDoc: PropTypes.bool,
  showUsers: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const showDocument = state.mydocument.showDocument;
  const showDoc = state.components.showDoc;
  const showUsers = state.components.showUsers;
  const user = state.users.userDetails;
  return {
    documents,
    showDocument,
    showDoc,
    showUsers,
    user
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    actions2: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

