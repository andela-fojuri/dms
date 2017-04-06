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

    const action = actions.getDocumentSuccess(docs.documents,
     docs.documentLabel, docs.totalCount, docs.path);
    const newState = documentReducer(initialState, action);

    expect(newState.documents.length).toEqual(2);
    expect(newState.path).toEqual('/documents');
    expect(newState.documentLabel).toEqual('MyLabel');
  });
});
