import React, { PropTypes } from 'react';

const Grid = ({ DocumentTitle, username, owner, publishedDate, modifiedDate,
  rolecategory, editIcon, deleteIcon, onClickOwner,
  onClickEdit, onClickDelete, action, showContent }) => (
    <div className="">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            <div className="card-title activator ">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <a onClick={showContent} id="title" className="docContent grey-text">
                        {DocumentTitle || username || rolecategory}
                      </a>
                    </td>
                    <td>
                      <a onClick={onClickOwner} className="grey-text">
                        {owner}
                      </a>
                    </td>
                    <td>
                      <p className="date grey-text">
                        {publishedDate}
                      </p>
                    </td>
                    <td>
                      <p className="date grey-text">
                        {modifiedDate}
                      </p>
                    </td>
                    <td>
                      <p className="right grey-text">
                        {action}
                      </p>
                    </td>
                    <td>
                      <a onClick={onClickEdit} className="right grey-text">
                        <i className="editIcon material-icons prefix">{editIcon}</i>
                      </a>
                    </td>
                    <td>
                      <a onClick={onClickDelete} className="right grey-text">
                        <i className="deleteIcon material-icons prefix">{deleteIcon}</i>
                      </a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

Grid.propTypes = {
  DocumentTitle: PropTypes.string,
  username: PropTypes.string,
  owner: PropTypes.string,
  publishedDate: PropTypes.string,
  modifiedDate: PropTypes.string,
  rolecategory: PropTypes.string,
  editIcon: PropTypes.string,
  deleteIcon: PropTypes.string,
  onClickOwner: PropTypes.func,
  showContent: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  action: PropTypes.string
};

export default Grid;
