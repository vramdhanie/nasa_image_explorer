import React from 'react';

const Options = ({ onChange, onClick, error, image_type }) => {
  const artifacts = ['planet', 'nebula', 'galaxy', 'pulsar'];
  const options = artifacts.map((a, i) => (
    <option value={a} key={i}>
      {a}
    </option>
  ));

  return (
    <div className="options">
      <h3>Select An option:</h3>
      <div className="options_form">
        <select value={image_type} onChange={e => onChange(e.target.value)}>
          {options}
        </select>
        <button onClick={onClick}> Search </button>
        {error ? <div className="error">{error}</div> : ''}
      </div>
    </div>
  );
};

export default Options;
