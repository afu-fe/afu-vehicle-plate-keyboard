# afu-vehicle-plate-keyboard-react or afu-vehicle-plate-keyboard-vue

简版车牌键盘。

## 🚗 Demo

![Demo](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-5.gif)

## 📷 Screenshots

![1](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-1.png)

![2](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-2.png)

## 📦 Installation

### vue3 
```Javascript
yarn add afu-vehicle-plate-keyboard-vue
npm install afu-vehicle-plate-keyboard-vue
```

### React 
```Javascript
yarn add afu-vehicle-plate-keyboard-react 
npm install afu-vehicle-plate-keyboard-react 
```

## 🔨 Usage

### React

```JavaScript
import { LicenseKeyboard } from 'afu-vehicle-plate-keyboard-react ';
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
      />
    </div>
  );
}


export default App;

```

### Vue3

```JavaScript
<template>
  <div>
    <button
      data-test-id="controlButton"
      @click="toggleKeyboard"
      type="submit"
    >
      {{ showKeyboard ? 'close' : 'open' }} the keyboard
    </button>

    <p data-test-id="value">{{ value }}</p>
    <LicenseKeyboard
      v-if="showKeyboard"
      @done="hideKeyboard"
      @onChange="updateValue"
      :value="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LicenseKeyboard } from 'afu-vehicle-plate-keyboard-vue';
const showKeyboard = ref(false);
const value = ref('');

const toggleKeyboard = () => {
  showKeyboard.value = !showKeyboard.value;
};

const hideKeyboard = () => {
  showKeyboard.value = false;
};

const updateValue = (newValue:string) => {
  value.value = newValue;
};
</script>


```

## 🗺 API

| props              | type                    | description                   |
| ------------------ | ----------------------- | ----------------------------- |
| visiable           | boolean                 | keyboard visible              |
| onChange           | (value: string) => void | trigger when user tap         |
| value              | string                  | controlled value              |
| done               | () => void              | trigger when keyborad dismiss |
| confirmButtonStyle | StyleVlaue     | confirm button style          |
| confirmButtonText  | string                  | confirm button text           |
| cellTextStyle      | StyleVlaue     | keycell style                 |
| cellDivStyle      | StyleVlaue     | keycell style                 |
| defalutConfig      | StyleVlaue     | expand rules                  |

## 📝 License

MIT License
