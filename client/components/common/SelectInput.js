import React, { PropTypes } from 'react';

const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <div className="row">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          id="selectInput"
          name={name}
          value={value}
          onChange={onChange}
          className="browser-default">
          <option value="" disabled selected>{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
  value: PropTypes.number,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SelectInput;
