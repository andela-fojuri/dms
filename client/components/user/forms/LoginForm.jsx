import React from 'react';
import TextInput from '../../common/TextInput';

export const LoginForm = ({ onChange, onClick, errors }) => {
  return (
    <div className="row">
      <form>
        <h5>Login</h5>
        <div className="row">
          <TextInput
              name="username"
              label="Username"
              icon="account_circle"
              onChange={onChange}
              error=""
          />
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
        <input
            type="button"
            className="waves-effect waves-light btn"
            value="Login"
            onClick={onClick}
        />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default LoginForm;
