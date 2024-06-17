import { LicenseKeyboard } from './packages';
import * as React from 'react';
import './App.css';

import { useState } from 'react';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [value, setValue] = useState('');
  const [rule, setRule] = useState('');

  return (
    <div>
      <button
        data-test-id="controlButton"
        onClick={() => setShowKeyboard(!showKeyboard)}
        type="submit"
      >{`${showKeyboard ? 'close' : 'open'} the keyboard`}</button>

      <p data-test-id="value">{value}</p>
      <LicenseKeyboard
        visible={showKeyboard}
        showNum={false}
        done={() => setShowKeyboard(false)}
        onChange={(value: any) => setValue(value)}
        onCurRule={(r)=>{
          if(r !== rule && showKeyboard){
            setRule(r);
          }
          console.log('222222', r);
        }}
        value={value}
        defalutConfig={
          {
            // "使": [
            //   ['ZCDEFGHJKLMNOPQRS', 'ABCDEFGHJK', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789']
            // ],
            // "京": [
            //   ['ABC', 'ABC', 'ABC', 'ABC', 'ABC', 'ABC', 'ABC'],
            //   ['ZCDEFGHJKLMNOPQRS', 'ABCDEFGHJK', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789']
            // ]
          }
        }
      />
    </div>
  );
}

export default React.memo(App);
