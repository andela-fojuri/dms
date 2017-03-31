import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, NavItem } from 'react-materialize';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import * as documentActions from '../../actions/documentActions';


const allAccess = ['Public', 'Private', 'Role'];
const access = [];
allAccess.forEach((acc) => {
  access.push({ value: acc, text: acc });
});

class DocumentForm extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      id: props.showDocument.id,
      content: props.showDocument.content,
      title: props.showDocument.title,
      access: props.showDocument.access,
      userId: props.showDocument.userId,
    };
    this.getDocs = this.getDocs.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showDocument.id !== nextProps.showDocument.id) {
      this.setState(() =>
        Object.assign({}, nextProps.showDocument)
      );
    }
  }


  onClickSave(event) {
    const field = event.currentTarget.name;
    if (field === 'back') {
      this.context.router.push('/dashboard');
    } else if (field === 'create') {
      this.props.actions.saveDocument(Object.assign({}, this.state)).then(() => {
        this.props.actions.getDocuments();
      });
    }
  }

  getDocs(index) {
    this.props.actions.showDocument(Object.assign({}, this.props.documents[index]));
  }

  handleModelChange(model) {
    this.setState(() => ({ content: model }));
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const value = event.target.value;
    this.setState(() => ({ [field]: value }));
  }

  deleteDoc(id, index) {
    this.props.actions.deleteDocument(id, index).then(() => {
      this.props.actions.getDocuments();
      this.props.actions.getPublicDocument();
      this.props.actions.getRoleDocument();
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s11">
          <div className="docTable">
            <div className="card">
              <div className="card-content">
                <div className="card-title activator ">
                  <a name="myDoc" className="titleText grey-text">Document Title</a>
                  <a className="ownerText grey-text">Owner</a>
                  {/* <a className="right grey-text">Action</a>
                  <a className="right grey-text">Date</a>*/}
                  
                </div>
              </div>
            </div>
            {this.props.documents.map((doc, index) => (
              <div key={doc.id}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-title activator ">
                      <a name="myDoc" className="grey-text " onClick={() => { this.getDocs(index); }}>{doc.title}</a>
                      <a className="grey-text">{doc.User.username}</a>
                      <a id="deleteIcon" name="delete" onClick={() => { this.deleteDoc(doc.id, index); }}><i className="material-icons right">delete</i></a>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
          <div id="modal1" className="modal">
            <div className="modal-content">
              <div className="row">
                <form>
                  <div className="row">
                    <div className="col s6">
                      <TextInput
                        name="title"
                        onChange={this.updateDocumentState}
                        value={this.state.title}
                      />
                    </div>
                    <div className="col s6">
                      <SelectInput
                        defaultOption="Select Doc Access"
                        name="access"
                        options={access}
                        onChange={this.updateDocumentState}
                        value={this.state.access}
                      />
                    </div>
                  </div>
                  <label htmlFor="content">Content </label>
                  <FroalaEditor
                    id="content"
                    name="content"
                    model={this.state.content}
                    onModelChange={this.handleModelChange}
                  />
                  <br />
                  <div className="row">
                    <input
                      id="createBtn"
                      name="create"
                      type="button"
                      className="waves-effect waves-light btn"
                      value="Save"
                      onClick={this.onClickSave}
                    />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

DocumentForm.propTypes = {
  actions: PropTypes.object.isRequired,
  showDocument: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
