import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import * as documentActions from '../../actions/documentActions';


export class DocumentGrid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.limit = 10;
    this.state = {
    };
    this.getDocs = this.getDocs.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
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

  getDocs(index) {
    this.props.actions.showDocument(Object.assign({}, this.props.documents[index]));
    $('#modal1').modal('open');
  }

  getTotalPage() {
    const { totalCount } = this.props;
    return totalCount % this.limit === 0 ? Math.floor(totalCount / this.limit) : Math.floor(totalCount / this.limit) + 1;
  }

  deleteDoc(id) {
    this.props.actions.deleteDocument(id).then(() => {
      this.props.actions.getDocuments();
    });
  }

  handlePagination(page) {
    const offset = page.selected * this.limit;
    this.props.actions.getDocs(this.props.path, offset, this.limit, this.props.label);
  }

  render() {
    return (
      <div className="row">
        <div className="col s11">
          <div className="docTable">
            <h4 className="docLabel" >{this.props.label} </h4>
            <div className="card">
              <div className="card-content">
                <div className="card-title activator ">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <a name="myDoc" className="grey-text">Document Title</a> </td>
                        <td><a className="grey-text">Owner</a></td>
                        <td><a className="grey-text">Date Published</a></td>
                        <td> <a className="right grey-text">Action</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {this.props.documents.map((doc, index) => (
              <div key={doc.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <a name="myDoc" className="grey-text " onClick={() => { this.getDocs(index); }}>{doc.title}</a>
                            </td>
                            <td><a className="grey-text">{doc.User.username}</a></td>
                            <td><a className="grey-text">{doc.User.createdAt}</a></td>
                            <td>
                              <a className="deleteIcon" id="deleteIcon" name="delete" onClick={() => { this.deleteDoc(doc.id); }}><i className="material-icons right">delete</i></a>
                              <a className={doc.title} id={doc.id} name="edit" onClick={() => { this.getDocs(index); }}><i className="material-icons right">mode_edit</i></a>
                            </td>
                          </tr>
                        </tbody>
                      </table>

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

