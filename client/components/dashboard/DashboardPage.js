import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentForm from '../document/DocumentForm';
import * as documentActions from '../../actions/documentActions';
import DashboardMenu from './DashboardMenu';
import RoleForm from '../role/RoleForm';
import UsersPage from '../user/UsersPage';
import Pagination from '../pagination/Pagination';


class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDoc: false,
      document: {}
    };

    this.updateStatus = this.updateStatus.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.onClickDocument = this.onClickDocument.bind(this);
    this.getContentValue = this.getContentValue.bind(this);
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

  onClickDocument(event, id) {
    const field = event.currentTarget.name;
    if (field === 'back') {
      this.context.router.push('/dashboard');
    } else if (field === 'create') {
      this.props.actions.createDocument(this.state.document);
    }
  }

  updateStatus(event) {
    console.log(event.currentTarget.name);
    const field = event.currentTarget.name;
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    console.log(this.state.document);
    return this.setState(document);
  }

  getContentValue(value) {
    const document = this.state.document;
    document.content = value;
    console.log(this.state.document);
    return this.setState(document);
  }

  render() {
    return (
      <div className="row">
        <DashboardMenu />
        <Pagination />
        <DocumentForm />
        <RoleForm />
        <UsersPage />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  showDocument: PropTypes.object.isRequired
};

DashboardPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  const documents = state.mydocument.documents;
  const showDocument = state.mydocument.showDocument;
  return {
    documents,
    showDocument,
    loginDetails: state.loginToken
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

