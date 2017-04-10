import React from 'react';
import TextInput from '../../common/TextInput';

export const SignupForm = ({ onSave, onChange }) => (
  <div className="row">
    <form>
      <h5>Sign Up</h5>
      <div className="row">
        <TextInput
          name="username"
          label="Username"
          onChange={onChange}
          icon="account_circle"
        />
      </div>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">mail_outline</i>
          <input
            type="email"
            name="email"
            className="validate"
            onChange={onChange}
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">https</i>
          <input
            type="password"
            name="password"
            className="validate"
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">https</i>
          <input
            type="password"
            name="password_confirmation"
            className="validate"
            onChange={onChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <input
            type="button"
            value="Signup"
            className="waves-effect waves-light btn"
            onClick={onSave}
          />
        </div>
      </div>
    </form>
  </div>
);

SignupForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default SignupForm;
