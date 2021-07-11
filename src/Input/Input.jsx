import React from 'react';

import './Input.css';

function Input({
  name,
  label,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div id={`${name}-container`} className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <div className={`error-container${error ? ' active' : ''}`}>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}

export default Input;
