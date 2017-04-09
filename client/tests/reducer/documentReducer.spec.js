import expect from 'expect';
import documentReducer from '../../reducers/documentReducer';
import * as actions from '../../actions/documentActions';

describe('Document Reducer', () => {
  it('should load documents when passed GET_DOCUMENTS_SUCCESS', () => {
    const initialState = {
      documents: [],
      documentLabel: '',
      totalCount: 0,
      path: ''
    };
    const docs = {
      documents: ['myDoc1', 'myDoc2'],
      documentLabel: 'MyLabel',
      totalCount: 2,
      path: '/documents'
    };

    const expectedState = {
      documents: ['myDoc1', 'myDoc2'],
      documentLabel: 'MyLabel',
      totalCount: 2,
      path: '/documents'
    };

    const action = actions.getDocumentSuccess(docs.documents,
      docs.documentLabel, docs.totalCount, docs.path);
    const newState = documentReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('shoud show a document when passed SHOW_DOCUMENT action', () => {

    const initialState = {
      showDocument: {}
    };
    const document = {
      access: 'Role',
      content: 'this is a doc'
    };

    const expectedState = {
      showDocument: {
        access: 'Role',
        content: 'this is a doc'
      }
    };

    const action = actions.showDocument(document);
    const newState = documentReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
