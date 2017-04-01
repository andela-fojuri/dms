import axios from 'axios';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import * as actions from './actionTypes';


export function getDocumentSuccess(documents) {
  return { type: actions.GET_DOCUMENTS_SUCCESS, documents };
}

export function getPublicDocumentSuccess(documents) {
  return { type: actions.GET_PUBLIC_DOCUMENTS_SUCCESS, documents };
}

export function getRoleDocumentSuccess(documents) {
  return { type: actions.GET_ROLE_DOCUMENTS_SUCCESS, documents };
}
export function getDocuments() {
  const id = localStorage.getItem('user');
  return dispatch => axios({
    url: `/users/${id}/documents`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      console.log(response.data)
      dispatch(getDocumentSuccess(response.data.message));
      browserHistory.push('/dashboard');
    }
  }).catch((error) => {
    throw (error);
  });
}

export function createDocumentSuccess() {
  return { type: actions.CREATE_DOCUMENTS_SUCCESS };
}

export function showDocument(show) {
  return { type: actions.SHOW_DOCUMENT, show };
}

export function newDocument(empty) {
  return { type: actions.NEW_DOCUMENT, empty };
}
export function deleteDocumentSuccess(deleted, index) {
  return { type: actions.DELETE_DOCUMENTS_SUCCESS, deleted, index };
}


export function getAccessibleDocuments() {
  return dispatch => axios({
    url: '/user/documents',
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    console.log(response.data);
    if (response.data.success) {
      dispatch(getDocumentSuccess(response.data.message));
    }
  }).catch((error) => {
    console.log(error.response);
    throw (error);
  });
}

export function getPublicDocument() {
  return dispatch => axios({
    url: '/public/documents',
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    console.log(response.data);
    if (response.data.success) {
      dispatch(getDocumentSuccess(response.data.message));
    }
  }).catch((error) => {
    console.log(error.response);
    throw (error);
  });
}

export function getRoleDocument() {
  return dispatch => axios({
    url: '/role/documents',
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      dispatch(getDocumentSuccess(response.data.message));
    }
  }).catch((error) => {
    throw (error);
  });
}

export function getAllDocuments() {
  return dispatch => axios({
    url: '/documents',
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      dispatch(getDocumentSuccess(response.data.message));
    }
  }).catch((error) => {
    throw (error);
  });
}


export function deleteDocument(id, index) {
  return dispatch => axios({
    url: `/documents/${id}`,
    method: 'delete',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((response) => {
    if (response.data.success) {
      toastr.success('Document deleted successfully');
      // dispatch(deleteDocumentSuccess(response.data.message, index));
    } else {
      console.log(response.data);
    }
  }).catch((error) => {
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
      { method: 'put', url: `/documents/id?id=${document.id}` });
  }
  return dispatch => axios(requestObj).then((response) => {
    if (response.data.success) {
      toastr.success(response.data.message);
      dispatch(createDocumentSuccess());
      $('#modal1').modal('close');
    }
  }, (error) => {
    console.log(error.response.data);
  }).catch((error) => {
    console.log('error', error.respose.data);
    // throw ('error', error);
  });
}

export function searchDocument(title) {
  return dispatch => axios({
    url: `/search/documents?title=${title}`,
    method: 'get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  }).then((documents) => {
    dispatch(getDocumentSuccess(documents.data.message));
  }).catch((error) => {
    throw (error);
  });
}
