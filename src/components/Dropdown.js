import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    console.log(options);
    const BodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        console.log(event.target);
        console.log(ref.current.contains(event.target));
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', BodyClick);
    return () => {
      document.body.removeEventListener('click', BodyClick);
      console.log('body');
    };
  }, []);
  const renderedOption = options.map((option) => {
    console.log(option);
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });
  console.log(ref.current);
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label} </div>
          <div className={`menu ${open ? ' visible transition' : ''}`}>
            {renderedOption}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
