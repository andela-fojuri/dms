import toastr from 'toastr';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function roleReducer(state = initialState.manageDocuments, action) {
  switch (action.type) {
    case types.GET_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, { documents: action.documents });
    case types.CREATE_DOCUMENTS_SUCCESS:
      return Object.assign({}, state);
    case types.SHOW_DOCUMENT:
      $('#modal1').modal('open');
      return Object.assign({}, state, { showDocument: action.show });
    case types.NEW_DOCUMENT:
      return Object.assign({}, state, { showDocument: action.empty });
    case types.DELETE_DOCUMENTS_SUCCESS:
      state.documents.splice(action.index, 1);
      return toastr.success(action.deleted);
    default:
      return state;
  }
}
