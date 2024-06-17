import React from 'react';

type LicensePlateRule = string[];

type LicensePlateRules = {
  [key: string]: LicensePlateRule[];
};

export interface KeyboardProps {
  visible: boolean;
  value: string;
  showNum?: boolean;
  done: () => void;
  onChange?: (text: string) => void;
  onCurRule?: (text: string) => void;
  confirmButtonStyle?: React.CSSProperties;
  cellTextStyle?: React.CSSProperties;
  cellDivStyle?: React.CSSProperties;
  confirmButtonText?: string;
  defalutConfig?: LicensePlateRules;
}
