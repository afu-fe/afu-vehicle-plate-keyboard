import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  firstScreen,
  localConfig,
  secondScreen,
} from '../config/index';
import './Index.css';
import KeyCell from './cell';
import { KeyboardProps } from './interface';

enum secondScreenStatus {
  DisableAll = 0,
  AllowAll,
  AlphabetOnly,
  NumberOnly,
  NoNumberOnly,
  AllowSpecialCharaters,
}
interface JudgeRulesArgs {
  key: string;
  len: number;
  currentValue: string | undefined; // 根据需要调整类型
}
interface DefaultConfig {
  [key: string]: string[];
}
type secondScreenType = secondScreenStatus | string;
const requestAnimationFrame = window.requestAnimationFrame;

const document = window.document;

const easeOut = (progress: number) => {
  let v = progress;
  return Math.pow(--v, 5) + 1;
};

// 字母
const isAlphabet = (s: string) => /[ABCDEFGHJKLMNPQRSTUVWXYZ]/.test(s);
//数字
const isNumber = (s: string) => /[0-9]/.test(s);
// 特殊字符
const isSpecialCharacters = (s: string) => /[港澳学警领挂使]/.test(s);

// 判断输入
const judgeInput = (s: string, onlyAllows: secondScreenType): boolean => {
  if (typeof onlyAllows === 'string') {
    return onlyAllows.indexOf(s) !== -1;
  } else if (onlyAllows === secondScreenStatus.AllowAll) {
    return isAlphabet(s) || isNumber(s);
  } else if (onlyAllows === secondScreenStatus.AlphabetOnly) {
    return isAlphabet(s);
  } else if (onlyAllows === secondScreenStatus.NumberOnly) {
    return isNumber(s);
  } else if (onlyAllows === secondScreenStatus.AllowSpecialCharaters) {
    return isAlphabet(s) || isNumber(s) || isSpecialCharacters(s);
  } else if (onlyAllows === secondScreenStatus.NoNumberOnly) {
    return !isNumber(s);
  } else {
    return false;
  }
};

const LicenseKeyboard = React.memo((props: KeyboardProps) => {
  const [defaultConfig, setDefaultConfig] = React.useState({});
  const [state, setState] = React.useState({
    keyboardOffsetProgress: 0,
  });
  const node = React.useRef<Element | null>(null);

  let elapsed = 0;
  let startTime = 0;
  let totalTime = 0;

  const resetTime = () => {
    startTime = performance.now();
    totalTime = 300;
  };
  const handleTouchStart = () => {};

  const handleTouchMove = (event: Event) => {
    event.preventDefault();
  };
  const creat = () => {
    node.current =
      document.querySelector('#auto-vehicle-plate-key-board') ||
      document.createElement('div');
    node.current.id = 'auto-vehicle-plate-key-board';
    document.body.appendChild(node.current);
    node.current.addEventListener('touchstart', handleTouchStart);
    node.current.addEventListener('touchmove', handleTouchMove);
  };

  const remove = () => {
    const currentNode = node.current;
    if (currentNode) {
      currentNode.removeEventListener('touchstart', handleTouchStart);
      currentNode.removeEventListener('touchmove', handleTouchMove);
    }
  };
  const animationTick = (now: number, direction: 'UP' | 'DOWN' = 'UP') => {
    elapsed = now - startTime;
    const progress = Math.min(easeOut(elapsed / totalTime), 1);

    setState((prevState) => ({
      ...prevState,
      keyboardOffsetProgress: direction === 'UP' ? progress : 1 - progress,
    }));

    if (progress < 1) {
      requestAnimationFrame((time: number) => animationTick(time, direction));
    }
  };
  const show = () => {
    creat();
    setDefaultConfig(localConfig(props?.defalutConfig || {}));
    resetTime();
    requestAnimationFrame(animationTick);
  };

  const hide = () => {
    resetTime();
    requestAnimationFrame((time) => animationTick(time, 'DOWN'));
  };

  const handleDone = () => {
    props.done();
  };

  const handleEnter = (cell: string) => {
    if (props.value.length < 8 && props.onChange) {
      props.onChange(props.value + cell);
    }
  };

  const handleDelete = () => {
    if (props.value.length > 0 && props.onChange) {
      props.onChange(props.value.slice(0, -1));
    }
  };
  const renderBackBtn = () => (
    <section
      className={`${'back-btn'} ${
        props.value.length === 0 ? 'cell-disabled' : 'cell-no-disabled'
      }`}
      onClick={handleDelete}
      key={'backBtn'}
    >
      <div className="back-btn-box">
        <span className="back-btn-svg">&#9003;</span>
      </div>
    </section>
  );
  const renderDoneBtn = () => (
    <section
      className={`${'back-btn '} ${
        props.value.length === 0 ? 'cell-disabled' : 'cell-no-disabled'
      }`}
      onClick={handleDone}
      key={'backBtnDone'}
    >
      <div className="back-btn-box back-btn-done">
        <span className="back-btn-label">完成</span>
      </div>
    </section>
  );
  const renderProvinceSelect = () => (
    <article className="keyboard-container">
      {firstScreen?.map((row, index: number) => {
        return (
          <section className="keyboard-row keyboard-row-province" key={'firsts' + `${index}`}>
          {row.map((province: string) => (
            <KeyCell
              cellTextStyle={props.cellTextStyle}
              cellDivStyle={props.cellDivStyle}
              cell={province}
              key={province}
              onClick={handleEnter}
              type="province"
            />
          ))}
        </section>
        )
        }
      )}
    </article>
  );
  const renderNumberABCSelect = (
    type: secondScreenType = secondScreenStatus.DisableAll,
  ) => (
    <article className="keyboard-container keyboard-container-noprovince">
      <section className="keyboard-row">
        {secondScreen[0].map((cell: string) => (
          <KeyCell
            cellTextStyle={props.cellTextStyle}
            cellDivStyle={props.cellDivStyle}
            cell={cell}
            key={cell}
            onClick={handleEnter}
            disabled={!judgeInput(cell, type)}
            type="normal"
          />
        ))}
      </section>
      <section className="keyboard-row">
        {secondScreen[1].map((cell: string) => (
          <KeyCell
            cellTextStyle={props.cellTextStyle}
            cellDivStyle={props.cellDivStyle}
            cell={cell}
            key={cell}
            onClick={handleEnter}
            disabled={!judgeInput(cell, type)}
            type="normal"
          />
        ))}
      </section>
      <section className="keyboard-row">
        {secondScreen[2].map((cell: string) => (
          <KeyCell
            cellTextStyle={props.cellTextStyle}
            cellDivStyle={props.cellDivStyle}
            cell={cell}
            key={cell}
            onClick={handleEnter}
            disabled={!judgeInput(cell, type)}
            type="normal"
          />
        ))}
      </section>
      <section className="keyboard-row">
        {secondScreen[3]
          .map((cell: string) => (
            <KeyCell
              cellTextStyle={props.cellTextStyle}
              cellDivStyle={props.cellDivStyle}
              cell={cell}
              key={cell}
              onClick={handleEnter}
              disabled={!judgeInput(cell, type)}
              type="normal"
            />
          ))
          .concat(renderBackBtn()).concat(renderDoneBtn())}
      </section>
    </article>
  );
  React.useEffect(() => {
    if (props.visible) {
      show();
    } else {
      hide();
    }
    return () => {
      remove();
    };
  }, [props.visible]);
  const mergeAndRemoveDuplicates = (stringsArray: any[]) => {
    // 创建一个空的 Set 来存储字符串
    const mergedSet = new Set();
    // 遍历传入的字符串数组
    stringsArray.forEach((str) => {
      if (str) {
        // 将字符串按空格分割成单词，并添加到 Set 中
        str.split('').forEach((word: string) => mergedSet.add(word));
      }
    });
    // 将 Set 转换回数组并用空格连接成一个字符串
    return Array.from(mergedSet).join('');
  };
  const judgeRules = ({ key, len, currentValue }: JudgeRulesArgs): string => {
    const provinceArr = (defaultConfig as DefaultConfig)[key] || [];
    const arr: string[] = [];
    const newArr: string[] = [];
    provinceArr?.forEach((item) => {
      arr.push(item[len]);
      if (len > 0) {
        let flag = false;
        currentValue
          ?.slice(1)
          ?.split('')
          ?.forEach((ites, ind) => {
            if (item[ind] && item[ind].indexOf(ites) === -1) {
              flag = true;
            }
          });
        if (!flag) {
          newArr.push(item[len]);
        }
      }
    });
    const rules = mergeAndRemoveDuplicates(newArr?.length > 0 ? newArr : arr);
    return rules;
  };
  const renderKeyboard = () => {
    const vArr = props?.value.split('');
    const len = props.value.length;
    let rule = '';
    if (vArr?.length > 0) {
      // 计算规则
      rule = judgeRules({
        key: vArr[0],
        len: len - 1,
        currentValue: props.value,
      });
      if (props.onCurRule && props.visible) {
        props.onCurRule(rule);
      }
    }
    switch (len) {
      case 0:
        return renderProvinceSelect();
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        if (!rule) {
          return renderNumberABCSelect(secondScreenStatus.DisableAll);
        }
        return renderNumberABCSelect(rule);
      default:
        return renderNumberABCSelect(secondScreenStatus.DisableAll);
    }
  };

  if (node.current) {
    return createPortal(
      <section
        style={{
          transform: `translateY(calc(${
            1 - state.keyboardOffsetProgress
          } * 100%))`,
        }}
        className="vehicle-plate-keyboard-container"
      >
        <section className="confirm">
            请输入车牌号
          <div className="delWrapper" onClick={handleDone}>
            <div
              style={props.confirmButtonStyle}
              className="close"
            >
            </div>
          </div>
        </section>
        <section className="keyboard">{renderKeyboard()}</section>
      </section>,
      node.current,
    );
  }

  return null;
});

export default LicenseKeyboard;
