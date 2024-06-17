import * as React from 'react';

interface KeyboardCellProps {
  cell: string;
  cellTextStyle?: React.CSSProperties;
  cellDivStyle?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (cell: string) => void;
  type: keyboardCellType;
}

type keyboardCellType = 'province' | 'normal' | 'number' | 'character';

const TypeToStyle: { [key in keyboardCellType]: string } = {
  province: 'province-cell',
  character: 'character-cell',
  normal: 'normal-cell',
  number: 'number-cell',
};

const KeyboardCell = React.memo((props: KeyboardCellProps) => {
  const handleClick = () => {
    if (!props.disabled && typeof props.onClick === 'function') {
      props.onClick(props.cell);
    }
  };

  return (
    <section
      className={`${props.cell ? 'keyboard-cell' : ''} ${TypeToStyle[props.type]} ${
        props.disabled ? 'cell-disabled' : 'cell-no-disabled'
      }`}
      aria-disabled={props.disabled}
      aria-label={props.cell}
      role="button"
      onClick={()=>{
        if (props.cell){
          handleClick()
        }
      }}
      style={props.cellDivStyle}
    >
      <span style={props.cellTextStyle} className="cell-text">
        {props.cell}
      </span>
    </section>
  );
});

export default KeyboardCell;
