import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
];

const Translate = () => {
  const [langauge, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <Dropdown
        selected={langauge}
        label={'Select a Language'}
        onSelectedChange={setLanguage}
        options={options}
      />
    <hr></hr>
    <h3 className='ui header'>Output</h3>
    <Convert text={text} language={langauge} />
    </div>
  );
};

export default Translate;
