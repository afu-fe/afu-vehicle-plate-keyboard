# @auto/vehicle-plate-keyboard-react

React 实现的车牌键盘。

## 🚗 Demo

![Demo](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-4.gif)

## 📷 Screenshots

![1](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-1.png)

![2](https://z.autoimg.cn/sou/auto-vehicle-plate-keyboard/default-2.png)

## 📦 Installation

```Javascript
yarn add @auto/vehicle-plate-keyboard-react
```

## 🔨 Usage

```JavaScript
import { LicenseKeyboard } from '@auto/vehicle-plate-keyboard-react';
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
