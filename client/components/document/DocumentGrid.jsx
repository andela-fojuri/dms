import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import * as documentActions from '../../actions/documentActions';
import Grid from '../grid/Grid';
import Collection from '../grid/Collection';


export class DocumentGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.limit = 10;
    this.state = {
      limit: 10
    };
    this.getDocs = this.getDocs.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.showModal = this.showModal.bind(this);
    this.getLimitValue = this.getLimitValue.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
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

  getDocs(index) {
    this.props.actions.showDocument(Object.assign({}, this.props.documents[index]));
    $('#modal1').modal('open');
  }

  getTotalPage() {
    const { totalCount } = this.props;
    return totalCount % this.state.limit === 0 ? Math.floor(totalCount / this.state.limit)
      : Math.floor(totalCount / this.state.limit) + 1;
  }

  deleteDoc(id, index) {
    this.props.actions.deleteDocument(id, index).then(() => {
    });
  }

  getLimitValue(event) {
    const limit = event.target.value;
    this.setState({ limit });
    this.props.actions.getDocs(this.props.path, 0, limit, this.props.label);
  }

  handlePagination(page) {
    const offset = page.selected * this.state.limit;
    this.props.actions.getDocs(this.props.path, offset, this.state.limit, this.props.label);
  }

  showModal() {
    $('.button-collapse').sideNav('hide');
    this.props.actions.showDocument({ title: '', access: '', content: '', id: '' });
    $('#modal1').modal('open');
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="input-field inline limit col s1 offset-s9">
            Set Limit
            <input
              onChange={this.getLimitValue}
              id="limit"
              className="white limitNumber validate"
              type="number"
              min="0" />
          </div>
        </div>
        <div className="row">
          <div className="docTable">
            <Collection label={this.props.label} onClick={this.showModal} />
            <div className="collection-item">
              <Grid
                DocumentTitle="Document Title"
                owner="Owner"
                publishedDate="Published" modifiedDate="Modified" action="Action" />
              {this.props.documents.map((doc, index) => (
                <Grid
                  key={doc.id}
                  DocumentTitle={doc.title}
                  showContent={() => { this.getDocs(index); }}
                  owner={doc.User.username}
                  publishedDate={doc.createdAt.slice(0, 10)}
                  modifiedDate={doc.updatedAt.slice(0, 10)}
                  deleteIcon="delete"
                  editIcon="mode_edit"
                  onClickDelete={() => { this.deleteDoc(doc.id, index); }}
                  onClickEdit={() => { this.getDocs(index); }} />
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s5 offset-s3">
            <ReactPaginate
              pageCount={this.getTotalPage()}
              pageRangeDisplayed={0}
              marginPagesDisplayed={5}
              containerClassName="pagination blue-grey darken-4"
              activeClassName="active"
              pageClassName="waves_effect"
              onPageChange={this.handlePagination}
              pageLinkClassName="paginateLink" />
          </div>
        </div>

      </div>
    );
  }
}

DocumentGrid.propTypes = {
  showDocument: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  totalCount: PropTypes.number,
  path: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const label = state.mydocument.documentLabel;
  const showDocument = state.mydocument.showDocument;
  const totalCount = state.mydocument.totalCount;
  const path = state.mydocument.path;
  return {
    documents,
    showDocument,
    label,
    totalCount,
    path
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentGrid);

