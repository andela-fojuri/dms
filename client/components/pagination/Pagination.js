import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.limit = 5;
    this.state = {
      documents: this.props.documents
    };
  }

  // getPages(){
  //   const {totalCount} = this.props;
  //   let pages = "";
  //   for(let i = this.limit; i < totalCount; i+= this.limit){

  //   }
  // }

  render() {
    return (
      <div id="searchInput" className="col s6 input-field">
        <ul className="pagination">
          <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
          <li className="active"><a href="#!">1</a></li>
          <li className="waves-effect"><a href="#!">2</a></li>
          <li className="waves-effect"><a href="#!">3</a></li>
          <li className="waves-effect"><a href="#!">4</a></li>
          <li className="waves-effect"><a href="#!">5</a></li>
          <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const totalCount = state.mydocument.totalCount;
  const showDocument = state.mydocument.showDocument;
  return {
    documents,
    showDocument,
    totalCount
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

