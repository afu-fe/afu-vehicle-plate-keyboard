import './App.css';
import { LicenseKeyboard } from '@auto/vehicle-plate-keyboard-react';
import React from 'react'

import { useState } from 'react';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <button
        data-test-id="controlButton"
        onClick={() => setShowKeyboard(!showKeyboard)}
      >{`${showKeyboard ? 'close' : 'open'} the keyboard`}</button>

      <p data-test-id="value">{value}</p>
      <LicenseKeyboard
        visible={showKeyboard}
        done={() => setShowKeyboard(false)}
        onChange={(value: any) => setValue(value)}
        value={value}
        defalutConfig={{
          // "使": [
          //   ['ZCDEFGHJKLMNOPQRS', 'ABCDEFGHJK', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789']
          // ],
          // "京": [
          //   ['ABC', 'ABC', 'ABC', 'ABC', 'ABC', 'ABC', 'ABC'],
          //   ['ZCDEFGHJKLMNOPQRS', 'ABCDEFGHJK', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789']
          // ]
        }}
      />
    </div>
  );
}


export default App;
