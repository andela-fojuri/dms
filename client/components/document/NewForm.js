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
      document: {}
    };
  
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onClickSave(event) {
    const field = event.currentTarget.name;
    if (field === 'back') {
      this.context.router.push('/dashboard');
    } else if (field === 'create') {
      this.props.actions.createDocument(this.state.document);
    }
  }

  getDocs(index) {
    this.setState({ edit: true });
    const document = Object.assign({}, this.props.documents[index]);
    this.setState({ document });
    this.props.actions.showDocument(document);
  }

  handleModelChange(model) {
    const document = this.state.document;
    document.content = model;
    return this.setState(document);
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState(document);
  }

  deleteDoc(index) {
    const document = Object.assign({}, this.props.documents[index]);
    // this.props.documents.splice(index, 1);
    this.props.actions.deleteDocument(document.id);
  }


  render() {
    return (
      <div>
        <div id="modal2" className="modal">
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
                  tag="textarea"
                  model={this.state.content}
                  onModelChange={this.handleModelChange}
                />
                <br />
                <div className="row">
                  <input
                    id="backBtn"
                    name="back"
                    type="button"
                    className="waves-effect waves-light btn"
                    value="Back"
                    onClick={this.onClickSave}
                  />
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
