import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function roleReducer(state = initialState.Documents, action) {
  switch (action.type) {
    case types.DELETE_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        documents:
        state.documents.filter(docs => docs.id !== action.id)
      });
    case types.GET_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        documents: action.documents,
        documentLabel: action.label,
        totalCount: action.count,
        path: action.path
      });
    case types.SHOW_DOCUMENT:
      return Object.assign({}, state, { showDocument: action.documentDetails });
    default:
      return state;
  }
}
