# @auto/vehicle-plate-keyboard-vue

vue 实现的车牌键盘。

## 💡 Features

- 省份/使 + 字母（无 I/O）/ 数字 + 「港澳学警领挂」
- [新能源车牌规则](https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌)

## 🚗 Demo

![Demo](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/4.gif)

## 📷 Screenshots

![1](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/1.png)

![2](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/2.png)

![3](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/3.png)

## 📦 Installation

```Javascript
yarn add @auto/vehicle-plate-keyboard-vue
```

## 🔨 Usage

```JavaScript
import { LicenseKeyboard } from '@auto/vehicle-plate-keyboard-vue';

...

<LicenseKeyboard
   visible={state.showKeyboard}
   onChange={value => setState({ value })}
   value={state.value}
   done={() => setState({ showKeyboard: false })}
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
```

## 🗺 API

| props              | type                    | description                   |
| ------------------ | ----------------------- | ----------------------------- |
| visiable           | boolean                 | keyboard visible              |
| onChange           | (value: string) => void | trigger when user tap         |
| onCurRule          | (value: string) => void | 返回当前的匹配规则         |
| value              | string                  | controlled value              |
| done               | () => void              | trigger when keyborad dismiss |
| confirmButtonStyle | StyleVlaue     | confirm button style          |
| confirmButtonText  | string                  | confirm button text           |
| cellTextStyle      | StyleVlaue     | keycell style                 |
| cellDivStyle      | StyleVlaue     | keycell style                 |
| defalutConfig      | StyleVlaue     | expand rules                  |

## 📝 License

MIT License
