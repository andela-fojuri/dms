import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, placeholder, value, error, icon }) => (
  <div className="input-field col s12">
    <i className="material-icons prefix">{icon}</i>
    <input
          className="validate"
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
    <label htmlFor={name} data-error="wrong" data-success="right">{label}</label>
    {error && <div>{error}</div>}
  </div>
  );

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
