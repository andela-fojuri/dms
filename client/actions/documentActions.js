import axios from 'axios';
import toastr from 'toastr';
import * as actions from './actionTypes';
import { showDocComponent } from './componentActions';

let label2 = '';

export function getDocumentSuccess(documents, label, count, path) {
  return { type: actions.GET_DOCUMENTS_SUCCESS, documents, label, count, path };
}

export function deleteDocumentSuccess(id) {
  return { type: actions.DELETE_DOCUMENTS_SUCCESS, id };
}

export function showDocument(documentDetails) {
  return { type: actions.SHOW_DOCUMENT, documentDetails };
}

export function getDocs(path, offset, limit, label) {
  return dispatch => axios({
    url: `${path}?limit=${limit}&offset=${offset}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    label2 = label;
    if (response.data.documents) {
      dispatch(getDocumentSuccess(response.data.documents, label, response.data.count, path));
      dispatch(showDocComponent());
    }
  }).catch((error) => {
    throw (error);
  });
}


export function deleteDocument(id) {
  return dispatch => axios({
    url: `/documents/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    toastr.success(response.data.message);
    dispatch(deleteDocumentSuccess(id));
  }).catch((error) => {
    toastr.error(error.response.data.message);
    throw (error);
  });
}

export function saveDocument(document) {
  let requestObj = {
    method: 'post',
    url: '/documents',
    headers: { 'x-access-token': localStorage.getItem('token') },
    data: document
  };
  if (document.id !== '') {
    requestObj = Object.assign({}, requestObj,
      { method: 'put', url: `/documents/${document.id}` });
  }
  return dispatch => axios(requestObj).then((response) => {
    toastr.success(response.data.message);
  }).catch((error) => {
    toastr.error(error.response.data.message);
    throw (error);
  });
}

export function searchDocument(title) {
  return dispatch => axios({
    url: `/search/documents?title=${title}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.documents) {
      dispatch(getDocumentSuccess(response.data.documents, label2, response.data.count));
    }
  }).catch((error) => {
    throw (error);
  });
}
