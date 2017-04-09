import expect from 'expect';
import * as documentActions from '../../actions/documentActions';
import * as types from '../../actions/actionTypes';

describe('Test Document Action', () => {
  it('shoud create a SHOW_DOCUMENT action', () => {
    const documentDetails = {
      access: 'Role',
      content: 'This is a document',
      title: 3
    };
    const expectedAction = {
      type: types.SHOW_DOCUMENT,
      documentDetails
    };

    const action = documentActions.showDocument(documentDetails);
    expect(action).toEqual(expectedAction);
  });

  it('should create a DELETE_DOCUMENTS_SUCCESS  action', () => {
    const id = 8;
    const expectedAction = {
      type: types.DELETE_DOCUMENTS_SUCCESS,
      id
    };

    const action = documentActions.deleteDocumentSuccess(id);
    expect(action).toEqual(expectedAction);
  });

  it('shoud create a GET_DOCUMENTS_SUCCESS action', () => {
    const documents = [{
      access: 'Private',
      content: 'test Docc',
      title: 'My_Doc'
    },
    {
      access: 'Public',
      content: 'test Docc2',
      title: 'My_Doc2'
    }
    ];
    const label = 'myDoc';
    const count = documents.length;
    const path = '/documents';
    const expectedAction = {
      type: types.GET_DOCUMENTS_SUCCESS,
      documents,
      label,
      count,
      path
    };

    const action = documentActions.getDocumentSuccess(documents, label, count, path);
    expect(action).toEqual(expectedAction);
  });
});
