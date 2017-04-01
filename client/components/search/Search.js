import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    const value = event.target.value;
    this.props.actions.searchDocument(value);
    // const value = event.target.value;
    // console.log('value', value.length);
    // console.log(this.props.documents);
    // const currentDoc = this.props.documents;
    // let filtered = [];
    // const title = value.trim();
    // console.log(title.length);
    // if (title.length > 0) {
    //   filtered = currentDoc.filter((doc) => {
    //     return doc.title.includes(value);
    //   });
    //   console.log(filtered);
    //   this.props.actions.getDocumentSuccess(filtered);
    // } else {
    //   this.props.actions.getDocumentSuccess(currentDoc);
    // }
  }
  render() {
    return (
      <div className="right hide-on-med-and-down">
        <ul>
          <form>
            <li className="input-field">
              <input id="search" type="search" onChange={this.onSearchChange} required />
              <label id="searchIcon" className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            </li>
          </form>
        </ul>
      </div>
    );
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const showDocument = state.mydocument.showDocument;
  return {
    documents,
    showDocument
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

