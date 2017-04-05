import axios from 'axios';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import * as actions from './actionTypes';
import { showDocComponent } from './componentActions';
import configureStore from '../store/configureStore';

const store = configureStore();

let label2 = '';

export function getDocumentSuccess(documents, label, count, path) {
  return { type: actions.GET_DOCUMENTS_SUCCESS, documents, label, count, path };
}

// export function getDocuments() {
//   const id = localStorage.getItem('user');
//   return dispatch => axios({
//     url: `/users/${id}/documents`,
//     method: 'get',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   }).then((response) => {
//     if (response.data.success) {
//       label = 'My Documents';
//       dispatch(getDocumentSuccess(response.data.message, label));
//       dispatch(showDocComponent());
//       browserHistory.push('/dashboard');
//     }
//   }, (error) => {
//     toastr.error('An unexpected error occured');
//   }).catch((error) => {
//     toastr.error('An unexpected error occured');
//     throw (error);
//   });
// }

export function createDocumentSuccess() {
  return { type: actions.CREATE_DOCUMENTS_SUCCESS };
}

export function showDocument(show) {
  return { type: actions.SHOW_DOCUMENT, show };
}

export function newDocument() {
  const empty = { title: '', access: '', content: '', id: '' };
  return { type: actions.NEW_DOCUMENT, empty };
}
export function deleteDocumentSuccess(deleted, index) {
  return { type: actions.DELETE_DOCUMENTS_SUCCESS, deleted, index };
}

// export function getAccessibleDocuments() {
//   return dispatch => axios({
//     url: '/user/documents',
//     method: 'get',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   }).then((response) => {
//     if (response.data.success) {
//       label = 'Accessible Documents'
//       dispatch(getDocumentSuccess(response.data.message, label));
//       dispatch(showDocComponent());
//     }
//   }, () => {
//     toastr.error('An unexpected error occured');
//   }).catch((error) => {
//     toastr.error('An unexpected error occured');
//     throw (error);
//   });
// }

// export function getPublicDocument() {
//   return dispatch => axios({
//     url: '/public/documents',
//     method: 'get',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   }).then((response) => {
//     if (response.data.success) {
//       label = 'Public Documents';
//       dispatch(getDocumentSuccess(response.data.message, label));
//       dispatch(showDocComponent());
//     }
//   }, () => {
//     toastr.error('An unexpected error occured');
//   }).catch((error) => {
//     toastr.error('An unexpected error occured');
//     throw (error);
//   });
// }

// export function getRoleDocument() {
//   return dispatch => axios({
//     url: '/role/documents',
//     method: 'get',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   }).then((response) => {
//     if (response.data.success) {
//       label = 'Shared Documents'
//       dispatch(getDocumentSuccess(response.data.message, label));
//       dispatch(showDocComponent());
//     }
//   }, () => {
//     toastr.error('An unexpected error occured');
//   }).catch((error) => {
//     toastr.error('An unexpected error occured');
//     throw (error);
//   });
// }

// export function getAllDocuments() {
//   return dispatch => axios({
//     url: `/documents?limit=${5}&offset=${5}`,
//     method: 'get',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   }).then((response) => {
//     console.log(response.data);
//     if (response.data.success) {
//       label = 'All Documents';
//       dispatch(getDocumentSuccess(response.data.message, label, response.data.count));
//       dispatch(showDocComponent());
//     }
//   }, () => {
//     toastr.error('An unexpected error occured');
//   }).catch((error) => {
//     toastr.error('An unexpected error occured');
//     throw (error);
//   });
// }

export function getDocs(path, offset, limit, label) {
  return dispatch => axios({
    url: `${path}?limit=${limit}&offset=${offset}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    label2 = label;
    if (response.data.success) {
      dispatch(getDocumentSuccess(response.data.message, label, response.data.count, path));
      dispatch(showDocComponent());
    }
  }, () => {
    toastr.error('An unexpected error occured');
  }).catch((error) => {
    toastr.error('An unexpected error occured');
    throw (error);
  });
}


export function deleteDocument(id) {
  return dispatch => axios({
    url: `/documents/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      toastr.success('Document deleted successfully');
    } else {
      toastr.error('You do not have permission to delete this Document');
    }
  }, () => {
    toastr.error('An unexpected error occured');
  }).catch((error) => {
    toastr.error('An unexpected error occured');
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
    if (response.data.success) {
      toastr.success(response.data.message);
      dispatch(createDocumentSuccess());
      $('#modal1').modal('close');
    }
  }, (error) => {
    if (!document.title && !document.content) {
      toastr.error('Document Title/Content required');
    } else if (!document.content) {
      toastr.warning('Document Content required');
    } else if (!document.title) {
      toastr.warning('Document Title required');
    } else if (error.response.data.message === 'Title must be unique') {
      toastr.warning('Invalid Title');
    } else {
      toastr.error('An unexpected error occured');
    }
  }).catch((error) => {
    toastr.error('An unexpected error occured');
    throw (error);
  });
}

export function searchDocument(title) {
  return dispatch => axios({
    url: `/search/documents?title=${title}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((documents) => {
    dispatch(getDocumentSuccess(documents.data.message, label2, documents.data.count));
  }).catch((error) => {
    throw (error);
  });
}
