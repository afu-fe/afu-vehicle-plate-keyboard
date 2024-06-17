# @auto/vehicle-plate-keyboard-vue or @auto/vehicle-plate-keyboard-react

车牌键盘。

## 💡 Features

- 省份/使 + 字母（无 I/O）/ 数字 + 「港澳学警领挂」
- [新能源车牌规则](https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌)

## 🚗 Demo

![Demo](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/5.gif)

## 📷 Screenshots

![1](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/1.png)

![2](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/2.png)

![3](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/3.png)

## 📦 Installation

### vue3 
```Javascript
yarn add @auto/vehicle-plate-keyboard-vue 
npm install @auto/vehicle-plate-keyboard-vue
```

### React 
```Javascript
yarn add @auto/vehicle-plate-keyboard-react
npm install @auto/vehicle-plate-keyboard-react
```

## 🔨 Usage

### React

```JavaScript
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
import { LicenseKeyboard } from '@auto/vehicle-plate-keyboard-vue';
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
