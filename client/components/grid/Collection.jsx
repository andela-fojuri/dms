import React, { PropTypes } from 'react';

const Collection = ({ label, onClick }) => (
  <div className="col s12 setCollect docTable collection with-header white">
    <div className="docTable collection-header">
      <h4 className="center label" >{label} </h4>
      <a
        id="createDoc"
        name="create"
        className="modal-close"
        onClick={onClick} >
        <i className="material-icons">add</i>
        Create New
      </a>
    </div>
  </div>
);

Collection.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Collection;
