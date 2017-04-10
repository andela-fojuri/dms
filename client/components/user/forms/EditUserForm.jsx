import React from 'react';
import TextInput from '../../common/TextInput';

export const EditUserForm = ({ onSave, onChange }) => (
  <div className="row">
    <div id="editDetails" className="modal">
      <div className="modal-content">
        <div className="row">
          <a className="right modal-close ">
            <i className="black material-icons right">clear</i>
          </a>
        </div>
        <form>
          <h5>Edit Details</h5>
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div className="collapsible-header"><a>Edit Username</a></div>
              <div className="collapsible-body">
                <div className="row">
                  <TextInput
                    name="username"
                    label="New Username"
                    onChange={onChange}
                    icon="account_circle"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="collapsible-header"><a>Edit Password</a></div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input
                      type="password"
                      name="oldPassword"
                      className="validate"
                      onChange={onChange}
                    />
                    <label htmlFor="password">Old Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input
                      type="password"
                      name="newPassword"
                      className="validate"
                      onChange={onChange}
                    />
                    <label htmlFor="password">New Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      className="validate"
                      onChange={onChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="row">
            <div className="col s6">
              <input
                type="button"
                value="Update"
                className="waves-effect waves-light btn"
                onClick={onSave}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

EditUserForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default EditUserForm;
